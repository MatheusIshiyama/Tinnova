import {
  VehicleRepository,
  VehicleRepositoryListVehicles,
  VehicleRepositoryCreateVehicle,
  VehicleRepositoryGetVehicleById,
  VehicleRepositoryUpdateVehicle,
  VehicleRepositoryPatchVehicle,
  VehicleRepositoryDeleteVehicleById,
} from '../VehicleRepository';
import { prisma } from '../../prisma';

export class PrismaVehicleRepository implements VehicleRepository {
  async listVehicles(query: VehicleRepositoryListVehicles) {
    return prisma.vehicle.findMany({ where: query });
  }

  async createVehicle(vehicle: VehicleRepositoryCreateVehicle) {
    return prisma.vehicle.create({ data: { ...vehicle, createdAt: new Date() } });
  }

  async getVehicleById(id: VehicleRepositoryGetVehicleById) {
    return prisma.vehicle.findUnique({ where: { id } });
  }

  async updateVehicle({ id, ...vehicle }: VehicleRepositoryUpdateVehicle) {
    return prisma.vehicle.update({ where: { id }, data: { ...vehicle } });
  }

  async patchVehicle({ id, sold }: VehicleRepositoryPatchVehicle) {
    return prisma.vehicle.update({ where: { id }, data: { sold } });
  }

  async deleteVehicleById(id: VehicleRepositoryDeleteVehicleById) {
    return prisma.vehicle.delete({ where: { id } });
  }
}
