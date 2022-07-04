import { BusinessType } from './business-type.model';
import { PurchasePayment } from './purchase-payment.model';
import { Person } from "./person.model";
import { BusinessProduct } from "./business-product.model";

export class Business {
  id?: number;
  businessDate: string = '';
  businessProducts?: BusinessProduct[];
  businessPayments?: PurchasePayment[];
  businessType: BusinessType = new BusinessType();
  entity: Person = new Person();
  notes: string = '';
}
