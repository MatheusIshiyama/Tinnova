import { Link } from 'react-router-dom';
import styles from './styles.module.css';

interface Props {
  id: string;
  vehicle: string;
  color: string;
  brand: string;
  year: number;
  description?: string;
  sold: boolean;
  onChangeSoldStatus: (id: string, sold: boolean) => void;
}

export function VehicleCard({
  id,
  vehicle,
  color,
  brand,
  year,
  description,
  sold,
  onChangeSoldStatus,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h4 className={styles.title}>Id do veículo</h4>
          <p className={styles.id}>{id}</p>
        </div>
        {sold ? (
          <div className={styles.soldTag}>Vendido</div>
        ) : (
          <div className={styles.availableTag}>Disponível</div>
        )}
      </div>
      <div className={styles.info}>
        <div>
          <h4 className={styles.title}>Veículo</h4>
          <p>{vehicle}</p>
        </div>
        <div>
          <h4 className={styles.title}>Marca</h4>
          <p>{brand}</p>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          <h4 className={styles.title}>Cor</h4>
          <p>{color}</p>
        </div>
        <div>
          <h4 className={styles.title}>Ano</h4>
          <p>{year}</p>
        </div>
      </div>
      <div className={styles.description}>
        <h4 className={styles.title}>Descrição</h4>
        <p>{description}</p>
      </div>
      <div className={styles.buttons}>
        <Link
          type="button"
          className={styles.button}
          to={`/edit/${id}`}
          state={{ id, vehicle, color, brand, year, description, sold }}
        >
          Editar
        </Link>
        <button
          type="button"
          className={styles.buttonChangeStatus}
          onClick={() => onChangeSoldStatus(id, !sold)}
        >
          Definir como {sold ? 'disponível' : 'vendido'}
        </button>
      </div>
    </div>
  );
}
