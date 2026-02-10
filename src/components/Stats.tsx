import styles from './Stats.module.css';

const stats = [
  { number: '12+', label: 'Research Labs' },
  { number: '200+', label: 'Researchers' },
  { number: '50+', label: 'Industry Partners' },
  { number: '8', label: 'African Nations' },
];

export default function Stats() {
  return (
    <section className={styles.statsBar}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.stat}>
          <div className={styles.number}>{stat.number}</div>
          <div className={styles.label}>{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
