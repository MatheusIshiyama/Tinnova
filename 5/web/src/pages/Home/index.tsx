import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavBar, VehicleCard, Footer } from '../../components';
import { PlusCircle, Info } from 'phosphor-react';
import dayjs from 'dayjs';
import { api } from '../../services/api';

import styles from './styles.module.css';

export function Home() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadVehicles();
  }, []);

  async function loadVehicles(params?: any) {
    try {
      const { data } = await api.get('/veiculos', { params });
      setVehicles(data.vehicles);

      return data.vehicles;
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleSold(id: string, sold: boolean) {
    try {
      await api.patch(`/veiculos/${id}`, { sold: sold ? 'true' : 'false' });
      loadVehicles();
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleFilter(filterSelected: string) {
    const filterOptions: any = {
      available: {
        label: 'Disponíveis',
        apiRequest: true,
        query: {
          sold: false,
        },
      },
      sold: {
        label: 'Vendidos',
        apiRequest: true,
        query: {
          sold: true,
        },
      },
      lastWeek: {
        label: 'Recentes',
        apiRequest: false,
      },
    };

    setFilter(filterSelected);
    const updatedVehicles = await loadVehicles();

    if (!filterSelected.length) return;

    const filterInfo = filterOptions[filterSelected];

    if (filterInfo.apiRequest) return loadVehicles(filterInfo.query);

    const lastWeekVehicles: any = [];

    updatedVehicles.forEach((vehicle:any) => {
      if (dayjs().diff(dayjs(vehicle.createdAt), 'days') <= 7) lastWeekVehicles.push(vehicle);
    });

    return setVehicles(lastWeekVehicles);
  }

  return (
    <>
      <NavBar title="Gerenciador de veículos" />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.filter}>
            <p>Filtro: </p>
            <select onChange={(event) => handleFilter(event.target.value)}>
              <option defaultChecked value="">
                Nenhum
              </option>
              <option value="available">Disponíveis</option>
              <option value="sold">Vendidos</option>
              <option value="lastWeek">Recentes</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <Link className={styles.infoButton} to="/dashboard">
              <Info size={20} />
              <p>Informação geral</p>
            </Link>
            <Link className={styles.addButton} to="/new">
              <PlusCircle size={20} />
              <p>Adicionar novo veiculo</p>
            </Link>
          </div>
        </div>
        <div className={styles.vehicles}>
          {vehicles.map(({ id, ...rest }) => {
            return <VehicleCard key={id} id={id} {...rest} onChangeSoldStatus={handleSold} />;
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
