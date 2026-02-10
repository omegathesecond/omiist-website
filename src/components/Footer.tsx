import styles from './Footer.module.css';

const footerLinks = {
  research: [
    { label: 'AI & ML Lab', href: '#' },
    { label: 'FinTech Lab', href: '#' },
    { label: 'EdTech Lab', href: '#' },
    { label: 'Publications', href: '#' },
  ],
  programs: [
    { label: 'Fellowship', href: '#' },
    { label: 'Internships', href: '#' },
    { label: 'Summer Institute', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  connect: [
    { label: 'Contact', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Omevision', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>OMI<span>I</span>ST</div>
          <p>
            The Omevision Institute of Innovation, Science and Technology. 
            Pioneering research for African development.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Research</h4>
          <ul>
            {footerLinks.research.map((link, i) => (
              <li key={i}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Programs</h4>
          <ul>
            {footerLinks.programs.map((link, i) => (
              <li key={i}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Connect</h4>
          <ul>
            {footerLinks.connect.map((link, i) => (
              <li key={i}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Omevision Institute of Innovation, Science and Technology. All rights reserved.</p>
        <div className={styles.social}>
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
