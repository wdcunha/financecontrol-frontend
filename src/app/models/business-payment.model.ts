import { Business } from './business.model';
import { PaymentTypes } from './payment-types.model';

export class BusinessPayment {
  id?: number;
  amount: number = 0;
  payDate: string = '';
  payed: boolean = false;
  installment: number = 0;
  payment: PaymentTypes = new PaymentTypes();
  business: Business = new Business();
}
