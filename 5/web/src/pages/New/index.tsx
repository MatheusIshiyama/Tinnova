import { NavBar, VehicleForm, Footer } from '../../components';

import styles from './styles.module.css';

export function New() {
  return (
    <>
      <NavBar title="Adicionar novo veículo" redirect='/' />
      <div className={styles.container}>
        <VehicleForm />
      </div>
      <Footer />
    </>
  );
}
