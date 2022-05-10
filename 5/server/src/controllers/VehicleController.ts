import { Request, Response } from 'express';
import { VehicleService } from '../services';
import {
  CreateOrUpdateVehicleRequest,
  ListVehiclesRequest,
  PatchVehicleRequest,
} from '../middlewares';
import { PrismaVehicleRepository } from '../repositories/prisma';

class VehicleController {
  async listVehicles(req: ListVehiclesRequest, res: Response) {
    try {
      const { vehicle, color, brand, year, sold } = req.search;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicles = await vehicleService.listVehicles({ vehicle, color, brand, year, sold });

      return res.status(200).json({ vehicles });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createVehicle(req: CreateOrUpdateVehicleRequest, res: Response) {
    try {
      const { vehicle, color, brand, year, description, sold } = req.vehicleData;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicleData = await vehicleService.createVehicle({
        vehicle,
        color,
        brand,
        year,
        description,
        sold,
      });

      return res.status(201).json({ vehicle: vehicleData });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getVehicleById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicleData = await vehicleService.getVehicleById(id);

      if (!vehicleData) return res.status(404).json({ message: 'Vehicle not found' });

      return res.status(200).json({ vehicle: vehicleData });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateVehicle(req: CreateOrUpdateVehicleRequest, res: Response) {
    try {
      const { id } = req.params;
      const { vehicle, color, brand, year, description, sold } = req.vehicleData;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicleData = await vehicleService.getVehicleById(id);

      if (!vehicleData) return res.status(404).json({ message: 'Vehicle not found' });

      const newVehicle = await vehicleService.updateVehicle({
        id,
        vehicle,
        color,
        brand,
        year,
        description,
        sold,
      });

      return res.status(200).json({ vehicle: newVehicle });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async patchVehicle(req: PatchVehicleRequest, res: Response) {
    try {
      const { id } = req.params;
      const { sold } = req.patch;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicleData = await vehicleService.getVehicleById(id);

      if (!vehicleData) return res.status(404).json({ message: 'Vehicle not found' });

      const newVehicle = await vehicleService.patchVehicle({ id, sold });

      return res.status(200).json({ vehicle: newVehicle });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteVehicle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicleData = await vehicleService.getVehicleById(id);

      if (!vehicleData) return res.status(404).json({ message: 'Vehicle not found' });

      await vehicleService.deleteVehicle(id);

      return res.status(200).json({ message: 'Vehicle deleted' });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async vehiclesStatus(_req: Request, res: Response) {
    try {
      const prismaVehicleRepository = new PrismaVehicleRepository();
      const vehicleService = new VehicleService(prismaVehicleRepository);

      const vehicles = await vehicleService.listVehicles({});

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

      const filterVehicles: any = [];
      const brands: any = [];
      const colors: any = [];
      const solds: any = [];

      vehicles.forEach(({ vehicle, brand, color, sold }) => {
        filterVehicles.push(vehicle);
        brands.push(brand);
        colors.push(color);
        solds.push(sold);
      });

      const stats = {
        vehicles: filterCount(filterVehicles),
        brands: filterCount(brands),
        colors: filterCount(colors),
        solds: filterCount(solds),
        decades: filterDecades(),
      };

      return res.status(200).json({ stats });
    } catch (error) {
      console.log({ error });
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const vehicleController = new VehicleController();
