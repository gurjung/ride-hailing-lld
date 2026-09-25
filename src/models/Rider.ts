import { User } from "./User";

export class Rider extends User {
  private walletBalance: number;

  constructor(
    id: string,
    name: string,
    phoneNumber: string,
    email: string,
    walletBalance: number = 0.0,
    rating: number = 5.0,
  ) {
    super(id, name, phoneNumber, email, rating);
    this.walletBalance = walletBalance;
  }

  public getWalletBalance(): number {
    return this.walletBalance;
  }

  public addFunds(amount: number): void {
    if (amount <= 0) {
      throw new Error("Amount to add must be positive");
    }
    this.walletBalance += amount;
  }

  public deductFunds(amount: number): boolean {
    if (amount <= 0) {
      throw new Error("Amount to deduct must be positive");
    }
    if (this.walletBalance >= amount) {
      this.walletBalance -= amount;
      return true;
    }
    return false;
  }
}
