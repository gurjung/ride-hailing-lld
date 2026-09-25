import { DriverMatchingStrategy } from "../../interfaces/DriverMatchingStrategy";
import { Driver } from "../../models/Driver";
import { Location } from "../../models/Location";

export class RatingBasedDriverStrategy implements DriverMatchingStrategy {
  private maxDistanceKm: number;

  constructor(maxDistanceKm: number = 10.0) {
    this.maxDistanceKm = maxDistanceKm;
  }

  public findDriver(
    pickup: Location,
    availableDrivers: Driver[],
  ): Driver | null {
    const eligibleDrivers = availableDrivers.filter(
      (driver) =>
        driver.getCurrentLocation().distanceTo(pickup) <= this.maxDistanceKm,
    );

    if (eligibleDrivers.length === 0) {
      return null;
    }

    eligibleDrivers.sort((a, b) => b.getRating() - a.getRating());
    return eligibleDrivers[0];
  }
}
