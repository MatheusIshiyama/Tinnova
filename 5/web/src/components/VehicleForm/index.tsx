import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api';

import styles from './styles.module.css';

interface Props {
  vehicle?: string;
  brand?: string;
  color?: string;
  year?: string;
  description?: string;
  sold?: string;
}

export function VehicleForm(props: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [vehicle, setVehicle] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sold, setSold] = useState<string>('false');

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleIsEditing();
  }, []);

  function handleIsEditing() {
    if (id) {
      setIsEditing(true);

      setVehicle(props.vehicle!);
      setBrand(props.brand!);
      setColor(props.color!);
      setYear(props.year!);
      setDescription(props.description!);
      setSold(props.sold!);
    }
  }

  async function handleSubmitForm(event: FormEvent) {
    event.preventDefault();

    try {
      if (id) {
        await api.put(`/veiculos/${id}`, { vehicle, color, brand, year, description, sold });
        navigate('/');
      } else {
        await api.post('/veiculos', { vehicle, color, brand, year, description, sold });
        navigate('/');
      }
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <div className={styles.container}>
      <h3>Informações</h3>
      {id ? <p>{id}</p> : <></>}
      <form onSubmit={handleSubmitForm}>
        <div className={styles.info}>
          <div>
            <h4>Veículo</h4>
            <input
              required
              type="text"
              placeholder="ex. Carro"
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
            />
          </div>
          <div>
            <h4>Marca</h4>
            <input
              required
              type="text"
              placeholder="ex. Ford"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <h4>Cor</h4>
            <input
              required
              type="text"
              placeholder="ex. Prata"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div>
            <h4>Ano</h4>
            <input
              required
              type="number"
              placeholder="ex. 2022"
              value={year}
              onChange={(event) => setYear(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.description}>
          <div>
            <h4>Descrição</h4>
            <input
              type="text"
              placeholder="ex. Carro novo"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.sold}>
          <h4>Estado</h4>
          <select onChange={(event) => setSold(event.target.value)}>
            <option defaultChecked value="false">
              Disponível
            </option>
            <option value="true">Vendido</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          {isEditing ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
