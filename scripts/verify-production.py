"""Read-only production assertion. Run on a host with public network access.

Requires gcloud's existing deployer configuration and Secret Manager access.
Does not deploy, mutate infrastructure, or substitute for browser journey QA.
"""

import argparse
import json
import subprocess
import tempfile
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def secret(name):
    return subprocess.check_output(
        ["gcloud", "--configuration=deployer", "secrets", "versions", "access",
         "latest", "--project=hiyebo", "--secret=" + name], text=True,
    ).strip()


def read(url, headers=None):
    with urlopen(Request(url, headers=headers or {}), timeout=30) as response:
        require(response.status == 200, "Unexpected HTTP status: " + url)
        return response.read(), response.headers.get_content_type()


def public_read(url):
    # Use ordinary curl, with its default identity. Cloudflare rejects Python's
    # default client with error 1010; do not impersonate browsers or alter WAF.
    with tempfile.TemporaryDirectory(prefix="omiist-verify-") as directory:
        body = Path(directory) / "body"
        result = subprocess.check_output(
            ["curl", "--silent", "--show-error", "--fail", "--max-time", "30",
             "--output", str(body), "--write-out", "%{http_code} %{content_type}", url],
            text=True,
        )
        status, content_type = result.split(" ", 1)
        require(status == "200", "Unexpected HTTP status: " + url)
        return body.read_bytes(), content_type.split(";", 1)[0]


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "script" and attrs.get("src"):
            self.urls.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.urls.append(attrs["href"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--deployment", required=True)
    parser.add_argument("--commit", required=True)
    args = parser.parse_args()
    account = secret("CLOUDFLARE__ACCOUNT_ID")
    token = secret("CLOUDFLARE__API_TOKEN")
    payload, _ = read(
        "https://api.cloudflare.com/client/v4/accounts/" + account
        + "/pages/projects/omiist-website",
        {"Authorization": "Bearer " + token},
    )
    project = json.loads(payload)
    require(project.get("success") is True, "Cloudflare API did not succeed")
    deployment = project["result"]["canonical_deployment"]
    require(deployment["id"] == args.deployment, "Production deployment changed; review it")
    require(deployment["environment"] == "production", "Not a production deployment")
    require(deployment["latest_stage"]["status"] == "success", "Deployment not successful")
    require(deployment["deployment_trigger"]["metadata"]["commit_hash"] == args.commit,
            "Unexpected deployed commit")
    body, content_type = public_read("https://omiist.com/")
    html = body.decode()
    require(content_type == "text/html", "Homepage is not HTML")
    require("OMIIST — Omevision Institute of Innovation, Science and Technology" in html,
            "Expected application title missing")
    require('<div id="root"></div>' in html, "React root missing")
    assets = Assets()
    assets.feed(html)
    require(any(url.startswith("/assets/") and url.endswith(".js") for url in assets.urls),
            "Application JavaScript missing")
    require(any(url.endswith(".css") for url in assets.urls), "Stylesheet missing")
    for path in assets.urls:
        url = urljoin("https://omiist.com/", path)
        require(urlparse(url).netloc == "omiist.com", "Unexpected external asset: " + url)
        data, mime = public_read(url)
        require(bool(data), "Empty asset: " + url)
        expected = {"text/css"} if urlparse(url).path.endswith(".css") else {
            "text/javascript", "application/javascript"}
        require(mime in expected, "Unexpected asset content type: " + url + " " + mime)
    print(json.dumps({"success": True, "deployment": args.deployment,
                      "homepage": "https://omiist.com/", "assetsChecked": len(assets.urls)}))


if __name__ == "__main__":
    main()
