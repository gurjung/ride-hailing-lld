import { Ride } from "../models/Ride";

export interface RideObserver {
  onRideStatusChanged(ride: Ride): void;
}
