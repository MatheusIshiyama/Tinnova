export interface VehicleRepositoryListVehicles {
  vehicle?: string;
  brand?: string;
  year?: number;
  color?: string;
  sold?: boolean;
}

export interface VehicleRepositoryCreateVehicle {
  vehicle: string;
  color: string;
  brand: string;
  year: number;
  description?: string;
  sold: boolean;
}

export type VehicleRepositoryGetVehicleById = string;

export interface VehicleRepositoryUpdateVehicle {
  id: string;
  vehicle?: string;
  color?: string;
  brand?: string;
  year?: number;
  description?: string;
  sold?: boolean;
}

export interface VehicleRepositoryPatchVehicle {
  id: string;
  sold?: boolean;
}

export type VehicleRepositoryDeleteVehicleById = string;

export interface VehicleRepository {
  listVehicles: (query: VehicleRepositoryListVehicles) => Promise<any[]>;
  createVehicle: (vehicle: VehicleRepositoryCreateVehicle) => Promise<any>;
  getVehicleById: (id: VehicleRepositoryGetVehicleById) => Promise<any>;
  updateVehicle: (vehicle: VehicleRepositoryUpdateVehicle) => Promise<any>;
  patchVehicle: (partialVehicle: VehicleRepositoryPatchVehicle) => Promise<any>;
  deleteVehicleById: (id: VehicleRepositoryDeleteVehicleById) => Promise<any>;
}
