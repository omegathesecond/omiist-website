import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './CTA.module.css';

export default function CTA() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollReveal<HTMLParagraphElement>();
  const { ref: btnRef, isVisible: btnVisible } = useScrollReveal<HTMLAnchorElement>();

  return (
    <section id="apply" className={styles.cta}>
      <h2 ref={titleRef} className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
        Ready to Shape <em>Africa's</em> Technological Future?
      </h2>
      <p ref={textRef} className={`${styles.text} ${textVisible ? styles.visible : ''}`}>
        Join a community of researchers and innovators working on problems that matter.
      </p>
      <a 
        ref={btnRef} 
        href="#" 
        className={`${styles.btn} ${btnVisible ? styles.visible : ''}`}
      >
        Apply Now
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </a>
    </section>
  );
}
