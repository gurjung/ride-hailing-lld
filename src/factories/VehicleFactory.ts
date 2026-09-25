import { Vehicle } from "../models/Vehicle";
import { VehicleType } from "../enums/VehicleType";

export class VehicleFactory {
  public static createVehicle(
    vehicleNumber: string,
    model: string,
    type: VehicleType,
  ): Vehicle {
    switch (type) {
      case VehicleType.BIKE:
        return new Vehicle(vehicleNumber, model, type, 1, 8.0, 20.0);
      case VehicleType.SEDAN:
        return new Vehicle(vehicleNumber, model, type, 4, 15.0, 50.0);
      case VehicleType.SUV:
        return new Vehicle(vehicleNumber, model, type, 6, 22.0, 80.0);
      case VehicleType.PREMIUM:
        return new Vehicle(vehicleNumber, model, type, 4, 30.0, 120.0);
      default:
        throw new Error(`Unsupported vehicle type: ${type}`);
    }
  }
}
