import { BusinessType } from './business-type.model';
import { PurchasePayment } from './purchase-payment.model';
import { Person } from "./person.model";
import { PurchaseProduct } from "./purchase-product.model";

export interface Business {
  id?: number;
  businessDate: string;
  businessProducts?: PurchaseProduct[];
  businessPayments?: PurchasePayment[];
  businessType: BusinessType;
  entity: Person;
  notes: string;
}
