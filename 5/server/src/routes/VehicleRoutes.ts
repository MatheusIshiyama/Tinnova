import { Router } from 'express';
import { vehicleController } from '../controllers';
import { vehicleMiddleware } from '../middlewares';

export function VehicleRoutes(routes: Router) {
  routes
    .route('/veiculos')
    .get(vehicleMiddleware.listVehicles, vehicleController.listVehicles)
    .post(vehicleMiddleware.createOrUpdateVehicle, vehicleController.createVehicle);

  routes.route('/veiculos/status').get(vehicleController.vehiclesStatus);

  routes
    .route('/veiculos/:id')
    .get(vehicleController.getVehicleById)
    .put(vehicleMiddleware.createOrUpdateVehicle, vehicleController.updateVehicle)
    .patch(vehicleMiddleware.patchVehicle, vehicleController.patchVehicle)
    .delete(vehicleController.deleteVehicle);
}
