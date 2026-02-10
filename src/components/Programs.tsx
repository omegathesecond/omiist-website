import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Programs.module.css';

const programs = [
  { number: '01', title: 'Research Fellowship', description: 'Full-time research positions for postgraduate researchers', duration: '12-24 Months' },
  { number: '02', title: 'Graduate Internship', description: 'Hands-on research experience for current Master\'s and PhD students', duration: '3-6 Months' },
  { number: '03', title: 'Visiting Researcher', description: 'Collaborative research stays for established academics', duration: '1-12 Months' },
  { number: '04', title: 'Summer Institute', description: 'Intensive programs for exceptional undergraduate students', duration: '8 Weeks' },
  { number: '05', title: 'Industry Secondment', description: 'Embedded research positions within partner organizations', duration: '6-12 Months' },
];

export default function Programs() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal<HTMLHeadingElement>();

  return (
    <section id="programs" className={styles.programs}>
      <div className={styles.header}>
        <h2 ref={titleRef} className={`${styles.title} ${titleVisible ? styles.visible : ''}`}>
          Academic <em>Programs</em>
        </h2>
        <span className={styles.number}>03 / Programs</span>
      </div>

      <div className={styles.list}>
        {programs.map((program, index) => (
          <ProgramItem key={index} {...program} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ProgramItem({ number, title, description, duration, delay }: {
  number: string;
  title: string;
  description: string;
  duration: string;
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref} 
      className={`${styles.item} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className={styles.itemNumber}>{number}</span>
      <div className={styles.info}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className={styles.duration}>{duration}</span>
    </div>
  );
}
