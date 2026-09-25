import { User } from "./User";
import { Vehicle } from "./Vehicle";
import { Location } from "./Location";

export class Driver extends User {
  private vehicle: Vehicle;
  private currentLocation: Location;
  private isAvailable: boolean;

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    vehicle: Vehicle,
    currentLocation: Location,
    rating: number = 5.0,
  ) {
    super(id, name, phoneNumber, email, rating);
    this.vehicle = vehicle;
    this.currentLocation = currentLocation;
    this.isAvailable = true;
  }

  public getVehicle(): Vehicle {
    return this.vehicle;
  }

  public getCurrentLocation(): Location {
    return this.currentLocation;
  }

  public setCurrentLocation(location: Location): void {
    this.currentLocation = location;
  }

  public getIsAvailable(): boolean {
    return this.isAvailable;
  }

  public setAvailable(available: boolean): void {
    this.isAvailable = available;
  }
}
