import { ArrowLeft } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

interface Props {
  title: string;
  redirect?: string;
}

export function NavBar({ title, redirect }: Props) {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate(redirect!);
  }

  return (
    <div className={styles.navbar}>
      {redirect && <ArrowLeft size={20} className={styles.arrowLeft} onClick={handleRedirect} />}
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
