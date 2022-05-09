import { CircleNotch } from 'phosphor-react';

import styles from './styles.module.css';

export function Loading() {
  return <CircleNotch size={32} className={styles.loading} />;
}
