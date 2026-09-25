import { PaymentMethod } from "../enums/PaymentMethod";
import { PaymentStatus } from "../enums/PaymentStatus";

export class Payment {
  private id: string;
  private rideId: string;
  private amount: number;
  private paymentMethod: PaymentMethod;
  private status: PaymentStatus;
  private transactionTime: Date;

  constructor(
    id: string,
    rideId: string,
    amount: number,
    paymentMethod: PaymentMethod,
  ) {
    this.id = id;
    this.rideId = rideId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = PaymentStatus.PENDING;
    this.transactionTime = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getRideId(): string {
    return this.rideId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getPaymentMethod(): PaymentMethod {
    return this.paymentMethod;
  }

  public setPaymentMethod(method: PaymentMethod): void {
    this.paymentMethod = method;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }

  public setStatus(status: PaymentStatus): void {
    this.status = status;
  }

  public getTransactionTime(): Date {
    return this.transactionTime;
  }
}
