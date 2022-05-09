import { Request } from 'express';
import { vehicleMiddleware } from '../middlewares/VehicleMiddleware';

const createMockReq = (props: any) => {
  return props as Request;
};
const createMockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Test Vehicle Middleware', () => {
  describe('Test List Vehicles', () => {
    it('should format search', () => {
      const mockReq = createMockReq({
        query: {
          vehicle: 'Carro',
          color: 'Prata',
          brand: 'Honda',
          year: '2022',
          sold: 'false',
        },
      });

      const mockReq2 = createMockReq({ query: { sold: 'true' } });
      const mockRes = createMockRes();

      vehicleMiddleware.listVehicles(mockReq, mockRes, mockNext);
      vehicleMiddleware.listVehicles(mockReq2, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('Test Create or Update Vehicle', () => {
    it('should format not sold vehicle body', () => {
      const mockReq = createMockReq({
        body: {
          vehicle: 'Carro',
          color: 'Prata',
          brand: 'Honda',
          year: '2022',
          description: 'Carro novo 2022',
          sold: 'false',
        },
      });

      const mockReq2 = createMockReq({
        body: {
          vehicle: 'Civic',
          color: 'Prata',
          brand: 'Honda',
          year: '2022',
          description: 'Carro novo 2022',
          sold: 'true',
        },
      });

      const mockRes = createMockRes();

      vehicleMiddleware.createOrUpdateVehicle(mockReq, mockRes, mockNext);
      vehicleMiddleware.createOrUpdateVehicle(mockReq2, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should return required data', () => {
      const mockReq = createMockReq({
        method: 'POST',
        body: {
          vehicle: 'Civic',
          brand: 'Hondaa',
          year: '2022',
          description: 'Carro novo 2022',
          sold: 'false',
        },
      });

      const mockRes = createMockRes();

      vehicleMiddleware.createOrUpdateVehicle(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'color not provided' });
    });

    it('should return invalid brand', () => {
      const mockReq = createMockReq({
        body: {
          vehicle: 'Civic',
          color: 'Prata',
          brand: 'Hondaa',
          year: '2022',
          description: 'Carro novo 2022',
          sold: 'false',
        },
      });

      const mockRes = createMockRes();

      vehicleMiddleware.createOrUpdateVehicle(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid brand' });
    });
  });

  describe('Test Patch Vehicle', () => {
    it('should format patch vehicle', () => {
      const mockReq = createMockReq({ body: { sold: 'false' } });
      const mockReq2 = createMockReq({ body: { sold: 'true' } });
      const mockRes = createMockRes();

      vehicleMiddleware.patchVehicle(mockReq, mockRes, mockNext);
      vehicleMiddleware.patchVehicle(mockReq2, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });
});
