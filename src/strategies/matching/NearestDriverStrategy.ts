import { DriverMatchingStrategy } from "../../interfaces/DriverMatchingStrategy";
import { Driver } from "../../models/Driver";
import { Location } from "../../models/Location";

export class NearestDriverStrategy implements DriverMatchingStrategy {
  public findDriver(
    pickup: Location,
    availableDrivers: Driver[],
  ): Driver | null {
    if (availableDrivers.length === 0) {
      return null;
    }

    let nearestDriver: Driver | null = null;
    let minDistance = Number.MAX_VALUE;

    for (const driver of availableDrivers) {
      const distance = driver.getCurrentLocation().distanceTo(pickup);
      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    }

    return nearestDriver;
  }
}
