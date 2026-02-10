import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.badge}>Omevision Academic Division</div>
      
      <h1 className={styles.title}>
        <span className={styles.line}>
          <span>Where African</span>
        </span>
        <span className={styles.line}>
          <span><em>Innovation</em></span>
        </span>
        <span className={styles.line}>
          <span>Meets Science</span>
        </span>
      </h1>

      <p className={styles.subtitle}>
        The Omevision Institute of Innovation, Science and Technology pioneers research 
        at the intersection of technology, entrepreneurship, and African development.
      </p>

      <div className={styles.cta}>
        <a href="#programs" className={styles.btnPrimary}>
          Explore Programs
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </a>
        <a href="#research" className={styles.btnSecondary}>
          Our Research
        </a>
      </div>

      <div className={styles.accent}>
        <svg viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="180" stroke="#d4a853" strokeWidth="0.5"/>
          <circle cx="200" cy="200" r="140" stroke="#d4a853" strokeWidth="0.5"/>
          <circle cx="200" cy="200" r="100" stroke="#d4a853" strokeWidth="0.5"/>
          <line x1="200" y1="20" x2="200" y2="380" stroke="#d4a853" strokeWidth="0.5"/>
          <line x1="20" y1="200" x2="380" y2="200" stroke="#d4a853" strokeWidth="0.5"/>
          <line x1="72" y1="72" x2="328" y2="328" stroke="#d4a853" strokeWidth="0.5"/>
          <line x1="328" y1="72" x2="72" y2="328" stroke="#d4a853" strokeWidth="0.5"/>
        </svg>
      </div>
    </section>
  );
}
