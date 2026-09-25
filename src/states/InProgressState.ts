import { RideState } from "../interfaces/RideState";
import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";
import { CompletedState } from "./CompletedState";
import { CancelledState } from "./CancelledState";

export class InProgressState implements RideState {
  public accept(ride: Ride, driver: Driver): void {
    throw new Error("Cannot accept an in-progress ride");
  }

  public start(ride: Ride): void {
    throw new Error("Ride is already in progress");
  }

  public complete(ride: Ride): void {
    const driver = ride.getDriver();
    if (driver) {
      driver.setAvailable(true);
      driver.setCurrentLocation(ride.getDropLocation());
    }
    ride.setState(new CompletedState());
  }

  public cancel(ride: Ride): void {
    const driver = ride.getDriver();
    if (driver) {
      driver.setAvailable(true);
    }
    ride.setState(new CancelledState());
  }

  public getStatus(): RideStatus {
    return RideStatus.IN_PROGRESS;
  }
}
