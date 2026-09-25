import { Driver } from "../models/Driver";
import { Location } from "../models/Location";
import { VehicleType } from "../enums/VehicleType";

export class DriverService {
  private drivers: Map<string, Driver>;

  constructor() {
    this.drivers = new Map<string, Driver>();
  }

  public registerDriver(driver: Driver): void {
    this.drivers.set(driver.getId(), driver);
  }

  public getDriver(driverId: string): Driver | undefined {
    return this.drivers.get(driverId);
  }

  public getAvailableDrivers(vehicleType: VehicleType): Driver[] {
    const available: Driver[] = [];
    for (const driver of this.drivers.values()) {
      if (
        driver.getIsAvailable() &&
        driver.getVehicle().getType() === vehicleType
      ) {
        available.push(driver);
      }
    }
    return available;
  }

  public updateDriverLocation(driverId: string, location: Location): void {
    const driver = this.getDriver(driverId);
    if (!driver) {
      throw new Error(`Driver not found: ${driverId}`);
    }
    driver.setCurrentLocation(location);
  }

  public setDriverAvailability(driverId: string, available: boolean): void {
    const driver = this.getDriver(driverId);
    if (!driver) {
      throw new Error(`Driver not found: ${driverId}`);
    }
    driver.setAvailable(available);
  }
}
