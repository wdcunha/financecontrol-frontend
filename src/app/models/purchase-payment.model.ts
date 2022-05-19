import { PaymentTypes } from './payment-types.model';

export interface PurchasePayment {
  amount: number;
  payment:PaymentTypes;
  quantity:number;
  installments:number;
}
