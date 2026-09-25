import { Rider } from "../models/Rider";

export class RiderService {
  private riders: Map<string, Rider>;

  constructor() {
    this.riders = new Map<string, Rider>();
  }

  public registerRider(rider: Rider): void {
    this.riders.set(rider.getId(), rider);
  }

  public getRider(riderId: string): Rider | undefined {
    return this.riders.get(riderId);
  }

  public addFunds(riderId: string, amount: number): void {
    const rider = this.getRider(riderId);
    if (!rider) {
      throw new Error(`Rider not found: ${riderId}`);
    }
    rider.addFunds(amount);
  }
}
