import { PricingStrategy } from "../../interfaces/PricingStrategy";
import { Vehicle } from "../../models/Vehicle";

export class SurgePricingStrategy implements PricingStrategy {
  private surgeMultiplier: number;

  constructor(surgeMultiplier: number) {
    if (surgeMultiplier < 1.0) {
      throw new Error("Surge multiplier cannot be less than 1.0");
    }
    this.surgeMultiplier = surgeMultiplier;
  }

  public calculateFare(distanceInKm: number, vehicle: Vehicle): number {
    const baseFareTotal =
      vehicle.getBaseFare() + distanceInKm * vehicle.getPerKmRate();
    const totalFare = baseFareTotal * this.surgeMultiplier;
    return Math.round(totalFare * 100) / 100;
  }

  public getSurgeMultiplier(): number {
    return this.surgeMultiplier;
  }

  public setSurgeMultiplier(multiplier: number): void {
    if (multiplier < 1.0) {
      throw new Error("Surge multiplier cannot be less than 1.0");
    }
    this.surgeMultiplier = multiplier;
  }
}
