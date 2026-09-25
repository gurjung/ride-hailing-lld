import { PricingStrategy } from "../interfaces/PricingStrategy";
import { StandardPricingStrategy } from "../strategies/pricing/StandardPricingStrategy";
import { Vehicle } from "../models/Vehicle";

export class PricingService {
  private pricingStrategy: PricingStrategy;

  constructor(
    pricingStrategy: PricingStrategy = new StandardPricingStrategy(),
  ) {
    this.pricingStrategy = pricingStrategy;
  }

  public setPricingStrategy(pricingStrategy: PricingStrategy): void {
    this.pricingStrategy = pricingStrategy;
  }

  public getPricingStrategy(): PricingStrategy {
    return this.pricingStrategy;
  }

  public calculateFare(distanceInKm: number, vehicle: Vehicle): number {
    return this.pricingStrategy.calculateFare(distanceInKm, vehicle);
  }
}
