import { PaymentHandler } from "./PaymentHandler";
import { Payment } from "../models/Payment";
import { Rider } from "../models/Rider";
import { PaymentMethod } from "../enums/PaymentMethod";
import { PaymentStatus } from "../enums/PaymentStatus";

export class CardPaymentHandler extends PaymentHandler {
  public handle(payment: Payment, rider: Rider): boolean {
    if (payment.getPaymentMethod() === PaymentMethod.CARD) {
      payment.setStatus(PaymentStatus.COMPLETED);
      console.log(
        `[CardPayment] Successfully charged $${payment.getAmount()} to registered card for rider ${rider.getName()}`,
      );
      return true;
    }

    return this.passToNext(payment, rider);
  }
}
