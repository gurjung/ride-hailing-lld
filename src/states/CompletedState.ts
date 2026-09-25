import { RideState } from "../interfaces/RideState";
import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";

export class CompletedState implements RideState {
  public accept(ride: Ride, driver: Driver): void {
    throw new Error("Cannot accept a completed ride");
  }

  public start(ride: Ride): void {
    throw new Error("Cannot start a completed ride");
  }

  public complete(ride: Ride): void {
    throw new Error("Ride is already completed");
  }

  public cancel(ride: Ride): void {
    throw new Error("Cannot cancel a completed ride");
  }

  public getStatus(): RideStatus {
    return RideStatus.COMPLETED;
  }
}
