import { PaymentHandler } from "./PaymentHandler";
import { Payment } from "../models/Payment";
import { Rider } from "../models/Rider";
import { PaymentStatus } from "../enums/PaymentStatus";

export class PaymentValidationHandler extends PaymentHandler {
  public handle(payment: Payment, rider: Rider): boolean {
    if (payment.getAmount() <= 0) {
      payment.setStatus(PaymentStatus.FAILED);
      console.log(
        `[PaymentValidation] Invalid payment amount: ${payment.getAmount()}`,
      );
      return false;
    }

    return this.passToNext(payment, rider);
  }
}
