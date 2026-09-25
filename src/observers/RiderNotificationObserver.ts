import { RideObserver } from "../interfaces/RideObserver";
import { Ride } from "../models/Ride";

export class RiderNotificationObserver implements RideObserver {
  public onRideStatusChanged(ride: Ride): void {
    const rider = ride.getRider();
    const status = ride.getStatus();
    const driver = ride.getDriver();
    const driverInfo = driver
      ? `${driver.getName()} (${driver.getVehicle().getModel()} - ${driver.getVehicle().getVehicleNumber()})`
      : "Searching...";
    console.log(
      `[Notification to Rider: ${rider.getName()}] Ride ${ride.getId()} status changed to ${status}. Driver: ${driverInfo}`,
    );
  }
}
