import { RideState } from "../interfaces/RideState";
import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";

export class CancelledState implements RideState {
  public accept(ride: Ride, driver: Driver): void {
    throw new Error("Cannot accept a cancelled ride");
  }

  public start(ride: Ride): void {
    throw new Error("Cannot start a cancelled ride");
  }

  public complete(ride: Ride): void {
    throw new Error("Cannot complete a cancelled ride");
  }

  public cancel(ride: Ride): void {
    throw new Error("Ride is already cancelled");
  }

  public getStatus(): RideStatus {
    return RideStatus.CANCELLED;
  }
}
