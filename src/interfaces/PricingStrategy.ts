import { Vehicle } from "../models/Vehicle";

export interface PricingStrategy {
  calculateFare(distanceInKm: number, vehicle: Vehicle): number;
}
