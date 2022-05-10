import { useEffect, useState } from 'react';
import { NavBar, Footer, Loading } from '../../components';
import { api } from '../../services/api';

import styles from './styles.module.css';

interface FilterCount {
  filterVehicles: string[];
  brands: string[];
  colors: string[];
  solds: string[];
}

export function Dashboard() {
  const [isLoadingData, setIsloadingData] = useState(true);
  const [stats, setStats] = useState<any>();
  const [filteredVehicles, setFilteredVehicles] = useState<any>(null);
  const [filteredBrands, setFilteredBrands] = useState<any>(null);
  const [filteredColors, setFilteredColors] = useState<any>(null);
  const [filteredSolds, setFilteredSolds] = useState<any>(null);
  const [filteredDecades, setFilteredDecades] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadStats() {
    try {
      const { data } = await api.get('/veiculos/status');
      return data.stats;
    } catch (error) {
      console.log({ error });
    }
  }

  async function loadData() {
    const stats = await loadStats();

    const { vehicles, brands, colors, solds, decades } = stats;

    setFilteredVehicles(vehicles);
    setFilteredBrands(brands);
    setFilteredColors(colors);
    setFilteredSolds(solds);
    setFilteredDecades(decades);

    setIsloadingData(false);
  }

  return isLoadingData ? (
    <></>
  ) : (
    <>
      <NavBar title="Informações" redirect="/" />

      <div className={styles.container}>
        <div className={styles.card}>
          <h3>Veículos por tipo</h3>
          {Object.keys(filteredVehicles).map((key) => (
            <div className={styles.data}>
              <p key={key}>{key}:</p>
              <p>{filteredVehicles[key]}</p>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          <h3>Veículos por marca</h3>
          {Object.keys(filteredBrands).map((key) => (
            <div className={styles.data}>
              <p key={key}>{key}:</p>
              <p>{filteredBrands[key]}</p>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          <h3>Veículos por cor</h3>
          {Object.keys(filteredColors).map((key) => (
            <div className={styles.data}>
              <p key={key}>{key}:</p>
              <p>{filteredColors[key]}</p>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          <h3>Veículos vendidos</h3>
          {Object.keys(filteredSolds).map((key) => (
            <div className={styles.data}>
              <p key={key}>{key === 'false' ? 'disponível' : 'vendido'}:</p>
              <p>{filteredSolds[key]}</p>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          <h3>Veículos por decada</h3>
          {Object.keys(filteredDecades).map((key) => (
            <div className={styles.data}>
              <p key={key}>{key}:</p>
              <p>{filteredDecades[key]}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
