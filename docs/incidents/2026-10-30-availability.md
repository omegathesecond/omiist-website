# Production availability investigation

Task: `incident-8ba10469bf1472a001efa78c`. Checked 2026-10-30, approximately
17:25–17:28 UTC, on the cloud worker. No application or infrastructure repair
was justified by the reproduced evidence. No production mutation was made.

## Evidence

- The existing task branch had no commits beyond freshly fetched `origin/main`;
  there was no remote incident branch or uncommitted work.
- Authenticated dashboard task and agent-session reads both returned HTTP 200
  with `success: true` from the host context.
- Ordinary sandbox networking could not resolve `omiist.com`. This is a local
  execution restriction, not evidence that public DNS or the site is down.
- Host-context curl returned HTTP 200 from `https://omiist.com/`, via Cloudflare.
- Host-context Chromium returned HTTP 200, rendered the OMIIST homepage and all
  primary sections, and recorded no page errors or HTTP responses >=400.
- A standard Python urllib request received HTTP 403, Cloudflare error 1010
  (browser signature denied). This is a reproduced client-specific access
  denial, not a reproduced outage for visitors. The original QA probe has no
  status or client diagnostics, so its cause cannot be established from that
  record. No user agent spoofing or protection changes were made.
- Cloudflare Pages project `omiist-website` has production branch `main`,
  build command `npm run build`, destination `dist`, and no Pages Functions.
  The canonical production deployment is
  `5cd00298-7b7f-4c6e-bb31-787238baadbe`, completed successfully on October 24.
  Its recorded commit is `4d5c70ae8c661e24aa6161186fe3a609df014675`.
- Production metadata says `commit_dirty: true`; its HTML contains an additional
  analytics script absent from Git. Redeploying this checkout would risk removing
  those live changes. Deployment settings, secrets, DNS, authentication, and
  Cloudflare protections were preserved. There is no Cloud Run runtime to resize.
- `npm run build` (including TypeScript) and `npm run lint` passed. The built
  JavaScript and CSS filenames match production's application asset references.

## Verification and QA handoff

Run from this repository on a host with public networking and the existing
deployer credentials:

```sh
python3 scripts/verify-production.py --deployment 5cd00298-7b7f-4c6e-bb31-787238baadbe --commit 4d5c70ae8c661e24aa6161186fe3a609df014675
```

This asserts the exact successful canonical deployment, expected homepage, and
nonempty JavaScript/CSS assets with correct content types. It fails on network,
provider, content, or deployment mismatch; it neither retries nor changes state.
It uses ordinary curl for public requests, whose behavior differs from Python's
default HTTP client as recorded above. It does not assert authentication or
programme delivery works.

Independent QA should retest normal desktop/mobile rendering and navigation to
Research, About, Programs, and Apply. This static site has no sign-in controls,
authentication implementation, or API calls. Apply Now, Explore Lab, and many
footer links currently point to `#`; these are existing incomplete journeys,
not a demonstrated availability regression. Do not report successful application
submission or sign-in. Preserve a failing probe's HTTP status, client identity,
Cloudflare Ray ID and response body so any access denial can be reviewed without
weakening protections. No independent QA pass has yet been claimed.
