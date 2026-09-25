import { Payment } from "../models/Payment";
import { Rider } from "../models/Rider";

export abstract class PaymentHandler {
  protected nextHandler: PaymentHandler | null = null;

  public setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  public abstract handle(payment: Payment, rider: Rider): boolean;

  protected passToNext(payment: Payment, rider: Rider): boolean {
    if (this.nextHandler) {
      return this.nextHandler.handle(payment, rider);
    }
    return false;
  }
}
