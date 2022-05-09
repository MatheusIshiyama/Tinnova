import { useEffect, useState } from 'react';
import { NavBar, Footer, Loading } from '../../components';
import { api } from '../../services/api';

import styles from './styles.module.css';

export function Dashboard() {
  const [isLoadingData, setIsloadingData] = useState(true);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<any>(null);
  const [filteredBrands, setFilteredBrands] = useState<any>(null);
  const [filteredColors, setFilteredColors] = useState<any>(null);
  const [filteredSolds, setFilteredSolds] = useState<any>(null);
  const [filteredDecades, setFilteredDecades] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadVehicles(params?: any) {
    try {
      const { data } = await api.get('/veiculos', { params });
      setVehicles(data.vehicles);
    } catch (error) {
      console.log({ error });
    }
  }

  function filterCount(data: string[]) {
    const dataCount: any = {};

    data.forEach((value) => {
      if (!dataCount[value]) {
        dataCount[value] = 1;
      } else {
        dataCount[value]++;
      }
    });

    return dataCount;
  }

  function filterDecades() {
    const decades = [1980, 1990, 2000, 2010, 2020];
    const decadesCount: any = {};

    decades.forEach((decade) => {
      const start = decade;
      const end = decade + 9;

      for (let index = start; index <= end; index++) {
        const filterVehicles = vehicles.filter((vehicle) => vehicle.year === index);

        if (filterVehicles.length) {
          if (!decadesCount[decade]) {
            decadesCount[decade] = filterVehicles.length;
          } else {
            decadesCount[decade] += filterVehicles.length;
          }
        }
      }
    });

    return decadesCount;
  }

  async function loadData() {
    await loadVehicles();

    const filterVehicles = vehicles.map((vehicle) => vehicle.vehicle);
    const brands = vehicles.map((vehicle) => vehicle.brand);
    const colors = vehicles.map((vehicle) => vehicle.color);
    const solds = vehicles.map((vehicle) => `${vehicle.sold}`);

    const getVehicles = filterCount(filterVehicles);
    setFilteredVehicles(getVehicles);

    const getBrands = filterCount(brands);
    setFilteredBrands(getBrands);

    const getColors = filterCount(colors);
    setFilteredColors(getColors);

    const getSolds = filterCount(solds);
    setFilteredSolds(getSolds);

    setFilteredDecades(filterDecades());

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
          <h3>Veículos por ano</h3>
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
