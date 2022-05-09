import styles from './styles.module.css';

export function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Desenvolvido por <a href="https://github.com/MatheusIshiyama" className={styles.glowText}>Matheus Ishiyama</a>
      </p>
    </div>
  );
}
