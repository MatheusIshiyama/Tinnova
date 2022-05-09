import { Request, Response, NextFunction } from 'express';

export interface ListVehiclesRequest extends Request {
  search?: any;
}

export interface CreateOrUpdateVehicleRequest extends Request {
  vehicleData?: any;
}

export interface PatchVehicleRequest extends Request {
  patch?: any;
}

class VehicleMiddleware {
  listVehicles(req: ListVehiclesRequest, _res: Response, next: NextFunction) {
    const { year } = req.query;

    const vehicle = req.query.vehicle as string;
    const color = req.query.color as string;
    const brand = req.query.brand as string;
    const sold = req.query.sold as string;

    req.search = {
      vehicle: vehicle && vehicle.toLowerCase(),
      color: color && color.toLowerCase(),
      brand: brand && brand.toLowerCase(),
      year: year && +year,
      sold: sold && (sold === 'true' ? true : false),
    };

    next();
  }

  createOrUpdateVehicle(req: CreateOrUpdateVehicleRequest, res: Response, next: NextFunction) {
    const { year } = req.body;
    const brandsAvailable = ['ford', 'honda', 'volkswagen', 'chevrolet'];

    const vehicle = req.body.vehicle as string;
    const color = req.body.color as string;
    const brand = req.body.brand as string;
    const description = req.body.description as string;
    const sold = req.body.sold as string;

    req.vehicleData = {
      vehicle: vehicle && vehicle.toLowerCase(),
      color: color && color.toLowerCase(),
      brand: brand && brand.toLowerCase(),
      year: year && +year,
      description,
      sold: sold && (sold === 'true' ? true : false),
    };

    const vehicleDataKeys = Object.keys(req.vehicleData);

    for (const key of vehicleDataKeys) {
      if (req.method === 'POST' && key !== 'description' && typeof req.body[key] === 'undefined')
        return res.status(400).json({ message: `${key} not provided` });
    }

    if (brand && !brandsAvailable.includes(brand.toLowerCase()))
      return res.status(401).json({ message: 'Invalid brand' });

    next();
  }

  patchVehicle(req: PatchVehicleRequest, _res: Response, next: NextFunction) {
    const { sold } = req.body;

    req.patch = {
      sold: sold && sold === 'true' ? true : false,
    };

    next();
  }
}

export const vehicleMiddleware = new VehicleMiddleware();
