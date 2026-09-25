import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";

export interface RideState {
  accept(ride: Ride, driver: Driver): void;
  start(ride: Ride): void;
  complete(ride: Ride): void;
  cancel(ride: Ride): void;
  getStatus(): RideStatus;
}
