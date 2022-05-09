import express from 'express';

export const routes = express.Router();

import { VehicleRoutes } from './VehicleRoutes';
import { HealthRoutes } from './HealthRoutes';

VehicleRoutes(routes);
HealthRoutes(routes);
