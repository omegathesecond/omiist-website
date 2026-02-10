import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.css';

const features = [
  { title: 'Applied Research', description: 'Every project targets real-world implementation within Omevision\'s product ecosystem.' },
  { title: 'Industry Partnership', description: 'Direct collaboration with leading African and global technology companies.' },
  { title: 'Talent Pipeline', description: 'Students move from research to product teams, building Africa\'s tech workforce.' },
  { title: 'Open Innovation', description: 'Sharing findings and tools openly to accelerate the continent\'s tech development.' },
];

export default function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollReveal();

  return (
    <section id="about" className={styles.about}>
      <div className={styles.image}>
        <div className={styles.pattern} />
      </div>
      <div className={styles.content}>
        <span className={styles.number}>02 / About</span>
        <h2 ref={titleRef} className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
          Building <em>Africa's</em> Future Through Research
        </h2>
        <div ref={textRef} className={`${styles.text} ${textVisible ? styles.visible : ''}`}>
          <p>
            OMIIST is the academic and research division of Omevision, dedicated to advancing 
            knowledge and developing technologies that address Africa's unique challenges and opportunities.
          </p>
          <p>
            We bring together world-class researchers, ambitious students, and industry partners 
            to create solutions that matter—not just for academic papers, but for real-world impact.
          </p>
        </div>

        <div className={styles.features}>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description, delay }: { title: string; description: string; delay: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref} 
      className={`${styles.feature} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
