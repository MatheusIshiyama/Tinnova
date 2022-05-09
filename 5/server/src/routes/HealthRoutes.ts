import { Router } from 'express';
import { healthController } from '../controllers';

export function HealthRoutes(routes: Router) {
  routes.get('/health', healthController.getStatus);
}
