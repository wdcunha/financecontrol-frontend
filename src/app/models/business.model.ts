import { BusinessType } from './business-type.model';
import { BusinessPayment } from './business-payment.model';
import { Person } from "./person.model";
import { BusinessProduct } from "./business-product.model";

export class Business {
  id?: number;
  businessDate: string = '';
  businessProducts?: BusinessProduct[];
  businessPayments?: BusinessPayment[];
  businessType: BusinessType = new BusinessType();
  businessTotal?: number;
  intallmentsValues? = [];
  entity: Person = new Person();
  notes: string = '';
  total?: string = '';
}
