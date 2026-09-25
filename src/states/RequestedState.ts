import { RideState } from "../interfaces/RideState";
import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";
import { AcceptedState } from "./AcceptedState";
import { CancelledState } from "./CancelledState";

export class RequestedState implements RideState {
  public accept(ride: Ride, driver: Driver): void {
    ride.setDriver(driver);
    driver.setAvailable(false);
    ride.setState(new AcceptedState());
  }

  public start(ride: Ride): void {
    throw new Error(
      "Cannot start a ride that has not been accepted by a driver",
    );
  }

  public complete(ride: Ride): void {
    throw new Error("Cannot complete a ride that has not started");
  }

  public cancel(ride: Ride): void {
    ride.setState(new CancelledState());
  }

  public getStatus(): RideStatus {
    return RideStatus.REQUESTED;
  }
}
