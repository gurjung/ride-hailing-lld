import { RideObserver } from "../interfaces/RideObserver";
import { Ride } from "../models/Ride";

export class DriverNotificationObserver implements RideObserver {
  public onRideStatusChanged(ride: Ride): void {
    const driver = ride.getDriver();
    if (driver) {
      const rider = ride.getRider();
      const status = ride.getStatus();
      console.log(
        `[Notification to Driver: ${driver.getName()}] Ride ${ride.getId()} status updated to ${status}. Rider: ${rider.getName()}, Phone: ${rider.getPhoneNumber()}`,
      );
    }
  }
}
