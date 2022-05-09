import { Request, Response } from 'express';

class HealthController {
  getStatus(_req: Request, res: Response) {
    return res.sendStatus(200);
  }
}

export const healthController = new HealthController();
