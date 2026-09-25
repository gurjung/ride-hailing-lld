import { PricingStrategy } from "../../interfaces/PricingStrategy";
import { Vehicle } from "../../models/Vehicle";

export class StandardPricingStrategy implements PricingStrategy {
  public calculateFare(distanceInKm: number, vehicle: Vehicle): number {
    const fare = vehicle.getBaseFare() + distanceInKm * vehicle.getPerKmRate();
    return Math.round(fare * 100) / 100;
  }
}
