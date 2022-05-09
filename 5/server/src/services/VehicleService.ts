import { VehicleRepository } from '../repositories';

interface ListVehiclesServiceRequest {
  vehicle?: string;
  color?: string;
  brand?: string;
  year?: number;
  sold?: boolean;
}

interface CreateVehicleServiceRequest {
  vehicle: string;
  color: string;
  brand: string;
  year: number;
  description?: string;
  sold: boolean;
}

type GetVehicleByIdRequest = string;

interface UpdateVehicleServiceRequest {
  id: string;
  vehicle?: string;
  color?: string;
  brand?: string;
  year?: number;
  description?: string;
  sold?: boolean;
}

interface PatchVehicleRequest {
  id: string;
  sold?: boolean;
}

type DeleteVehicleByIdRequest = string;

export class VehicleService {
  constructor(private vehicleRepository: VehicleRepository) {}

  async listVehicles(query: ListVehiclesServiceRequest) {
    const { vehicle, color, brand, year, sold } = query;

    return this.vehicleRepository.listVehicles({ vehicle, color, brand, year, sold });
  }

  async createVehicle(vehicleData: CreateVehicleServiceRequest) {
    const { vehicle, color, brand, year, description, sold } = vehicleData;

    return this.vehicleRepository.createVehicle({ vehicle, color, brand, year, description, sold });
  }

  async getVehicleById(id: GetVehicleByIdRequest) {
    return this.vehicleRepository.getVehicleById(id);
  }

  async updateVehicle(vehicleData: UpdateVehicleServiceRequest) {
    const { id, vehicle, color, brand, year, description, sold } = vehicleData;

    return this.vehicleRepository.updateVehicle({
      id,
      vehicle,
      color,
      brand,
      year,
      description,
      sold,
    });
  }

  async patchVehicle(partialVehicle: PatchVehicleRequest) {
    const { id, sold } = partialVehicle;

    return this.vehicleRepository.patchVehicle({ id, sold });
  }

  async deleteVehicle(id: DeleteVehicleByIdRequest) {
    return this.vehicleRepository.deleteVehicleById(id);
  }
}
