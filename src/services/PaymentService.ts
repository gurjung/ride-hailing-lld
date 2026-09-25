import { PaymentHandler } from "../payment/PaymentHandler";
import { PaymentValidationHandler } from "../payment/PaymentValidationHandler";
import { WalletPaymentHandler } from "../payment/WalletPaymentHandler";
import { CardPaymentHandler } from "../payment/CardPaymentHandler";
import { Payment } from "../models/Payment";
import { Rider } from "../models/Rider";

export class PaymentService {
  private paymentChain: PaymentHandler;

  constructor() {
    const validationHandler = new PaymentValidationHandler();
    const walletHandler = new WalletPaymentHandler();
    const cardHandler = new CardPaymentHandler();

    validationHandler.setNext(walletHandler).setNext(cardHandler);
    this.paymentChain = validationHandler;
  }

  public setPaymentChain(customChain: PaymentHandler): void {
    this.paymentChain = customChain;
  }

  public processPayment(payment: Payment, rider: Rider): boolean {
    return this.paymentChain.handle(payment, rider);
  }
}
