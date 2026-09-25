import { RideState } from "../interfaces/RideState";
import { Ride } from "../models/Ride";
import { Driver } from "../models/Driver";
import { RideStatus } from "../enums/RideStatus";
import { InProgressState } from "./InProgressState";
import { CancelledState } from "./CancelledState";

export class AcceptedState implements RideState {
  public accept(ride: Ride, driver: Driver): void {
    throw new Error("Ride is already accepted by a driver");
  }

  public start(ride: Ride): void {
    ride.setState(new InProgressState());
  }

  public complete(ride: Ride): void {
    throw new Error("Cannot complete a ride before it is started");
  }

  public cancel(ride: Ride): void {
    const driver = ride.getDriver();
    if (driver) {
      driver.setAvailable(true);
    }
    ride.setState(new CancelledState());
  }

  public getStatus(): RideStatus {
    return RideStatus.ACCEPTED;
  }
}
