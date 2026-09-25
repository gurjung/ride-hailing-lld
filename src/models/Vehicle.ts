import { VehicleType } from "../enums/VehicleType";

export class Vehicle {
  private vehicleNumber: string;
  private model: string;
  private type: VehicleType;
  private capacity: number;
  private perKmRate: number;
  private baseFare: number;

  constructor(
    vehicleNumber: string,
    model: string,
    type: VehicleType,
    capacity: number,
    perKmRate: number,
    baseFare: number,
  ) {
    this.vehicleNumber = vehicleNumber;
    this.model = model;
    this.type = type;
    this.capacity = capacity;
    this.perKmRate = perKmRate;
    this.baseFare = baseFare;
  }

  public getVehicleNumber(): string {
    return this.vehicleNumber;
  }

  public getModel(): string {
    return this.model;
  }

  public getType(): VehicleType {
    return this.type;
  }

  public getCapacity(): number {
    return this.capacity;
  }

  public getPerKmRate(): number {
    return this.perKmRate;
  }

  public getBaseFare(): number {
    return this.baseFare;
  }
}
