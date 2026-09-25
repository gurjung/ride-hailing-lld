import { Driver } from "../models/Driver";
import { Location } from "../models/Location";

export interface DriverMatchingStrategy {
  findDriver(pickup: Location, availableDrivers: Driver[]): Driver | null;
}
