import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        OMI<span>I</span>ST
      </div>
      <ul className={styles.links}>
        <li><a href="#research">Research</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#programs">Programs</a></li>
        <li><a href="#apply">Apply</a></li>
      </ul>
    </nav>
  );
}
