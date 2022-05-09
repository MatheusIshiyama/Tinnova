import { VehicleService } from '../services/VehicleService';

const listVehiclesSpy = jest.fn();
const createVehicleSpy = jest.fn();
const getVehicleByIdSpy = jest.fn();
const updateVehicleSpy = jest.fn();
const patchVehicleSpy = jest.fn();
const deleteVehicleSpy = jest.fn();

const vehicleService = new VehicleService({
  listVehicles: listVehiclesSpy,
  createVehicle: createVehicleSpy,
  getVehicleById: getVehicleByIdSpy,
  updateVehicle: updateVehicleSpy,
  patchVehicle: patchVehicleSpy,
  deleteVehicleById: deleteVehicleSpy,
});

describe('Test Vehicle Controller', () => {
  describe('Test List Vehicles', () => {
    it('should list vehicles', async () => {
      await expect(vehicleService.listVehicles({})).resolves.not.toThrow();

      expect(listVehiclesSpy).toHaveBeenCalled();
    });
  });

  describe('Test Create Vehicle', () => {
    it('should create vehicle', async () => {
      const mockVehicle = {
        vehicle: 'Carro',
        color: 'Prata',
        brand: 'Hondaa',
        year: 2022,
        description: 'Carro novo 2022',
        sold: false,
        createdAt: new Date(),
      };

      await expect(vehicleService.createVehicle(mockVehicle)).resolves.not.toThrow();

      expect(createVehicleSpy).toHaveBeenCalled();
    });
  });

  describe('Test Get Vehicle By Id', () => {
    it('should create vehicle', async () => {
      const id = '123';

      await expect(vehicleService.getVehicleById(id)).resolves.not.toThrow();

      expect(getVehicleByIdSpy).toHaveBeenCalled();
    });
  });

  describe('Test Update Vehicle', () => {
    it('should update vehicle', async () => {
      const mockVehicle = {
        id: '123',
        vehicle: 'Carro',
        color: 'Prata',
        brand: 'Hondaa',
        year: 2022,
        description: 'Carro novo 2022',
        sold: false,
      };

      await expect(vehicleService.updateVehicle(mockVehicle)).resolves.not.toThrow();

      expect(updateVehicleSpy).toHaveBeenCalled();
    });
  });

  describe('Test Patch Vehicle', () => {
    it('should patch vehicle', async () => {
      const mockVehicle = {
        id: '123',
        sold: false,
      };

      await expect(vehicleService.patchVehicle(mockVehicle)).resolves.not.toThrow();

      expect(patchVehicleSpy).toHaveBeenCalled();
    });
  });

  describe('Test Delete Vehicle', () => {
    it('should delete vehicle', async () => {
      const id = '123';

      await expect(vehicleService.deleteVehicle(id)).resolves.not.toThrow();

      expect(deleteVehicleSpy).toHaveBeenCalled();
    });
  });
});
