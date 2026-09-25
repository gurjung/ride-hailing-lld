import { PaymentHandler } from "./PaymentHandler";
import { Payment } from "../models/Payment";
import { Rider } from "../models/Rider";
import { PaymentMethod } from "../enums/PaymentMethod";
import { PaymentStatus } from "../enums/PaymentStatus";

export class WalletPaymentHandler extends PaymentHandler {
  public handle(payment: Payment, rider: Rider): boolean {
    if (payment.getPaymentMethod() === PaymentMethod.WALLET) {
      if (rider.getWalletBalance() >= payment.getAmount()) {
        rider.deductFunds(payment.getAmount());
        payment.setStatus(PaymentStatus.COMPLETED);
        console.log(
          `[WalletPayment] Paid $${payment.getAmount()} via Wallet. Remaining balance: $${rider.getWalletBalance().toFixed(2)}`,
        );
        return true;
      } else {
        console.log(
          `[WalletPayment] Insufficient wallet balance ($${rider.getWalletBalance().toFixed(2)}). Falling back to next payment handler...`,
        );
        payment.setPaymentMethod(PaymentMethod.CARD);
        return this.passToNext(payment, rider);
      }
    }

    return this.passToNext(payment, rider);
  }
}
