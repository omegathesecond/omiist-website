import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Research.module.css';

const researchAreas = [
  {
    icon: '◈',
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Developing AI solutions tailored for African contexts—from NLP for indigenous languages to computer vision for agricultural optimization.',
  },
  {
    icon: '◇',
    title: 'Financial Technology & Digital Economies',
    description: 'Researching inclusive fintech systems, mobile money infrastructure, and blockchain applications for emerging markets.',
  },
  {
    icon: '○',
    title: 'EdTech & Learning Sciences',
    description: 'Reimagining education through technology—adaptive learning systems, skills assessment, and digital credentialing for Africa.',
  },
  {
    icon: '□',
    title: 'Sustainable Infrastructure',
    description: 'Engineering solutions for smart cities, renewable energy systems, and climate-resilient infrastructure across the continent.',
  },
  {
    icon: '△',
    title: 'Health Technology',
    description: 'Creating diagnostic tools, telemedicine platforms, and health informatics solutions for resource-constrained environments.',
  },
  {
    icon: '⬡',
    title: 'Innovation & Entrepreneurship',
    description: 'Studying tech ecosystems, startup methodologies, and venture building strategies specific to African markets.',
  },
];

export default function Research() {
  const { ref, isVisible } = useScrollReveal<HTMLHeadingElement>();

  return (
    <section id="research" className={styles.research}>
      <div className={styles.header}>
        <h2 ref={ref} className={`${styles.title} ${isVisible ? styles.visible : ''}`}>
          Research <em>Frontiers</em>
        </h2>
        <span className={styles.number}>01 / Research</span>
      </div>

      <div className={styles.grid}>
        {researchAreas.map((area, index) => (
          <ResearchCard key={index} {...area} delay={index * 0.1} />
        ))}
      </div>
    </section>
  );
}

function ResearchCard({ icon, title, description, delay }: { 
  icon: string; 
  title: string; 
  description: string; 
  delay: number;
}) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div 
      ref={ref} 
      className={`${styles.card} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div>
        <div className={styles.icon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <a href="#" className={styles.link}>
        Explore Lab
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      </a>
    </div>
  );
}
