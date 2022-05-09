import { useEffect, useState } from 'react';
import { NavBar, VehicleForm, Footer } from '../../components';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.css';

export function Edit() {
  const [isSettingData, setIsSettingData] = useState(true);
  const [vehicle, setVehicle] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sold, setSold] = useState<string>('');

  const location: any = useLocation();

  useEffect(() => {
    handleLocationData();
  }, []);

  function handleLocationData() {
    const { state } = location;

    setVehicle(state.vehicle);
    setBrand(state.brand);
    setColor(state.color);
    setYear(state.year);
    setDescription(state.description);
    setSold(state.sold);

    setIsSettingData(false);
  }

  return isSettingData ? (
    <></>
  ) : (
    <>
      <NavBar title="Editar veículo" redirect='/' />
      <div className={styles.container}>
        <VehicleForm
          vehicle={vehicle}
          brand={brand}
          color={color}
          year={year}
          description={description}
          sold={sold}
        />
      </div>
      <Footer />
    </>
  );
}
