import { PurchasePayment } from './purchase-payment.model';
import { Person } from "./person.model";
import { PurchaseProduct } from "./purchase-product.model";

export interface Purchases {
  id: number;
  businessProducts: PurchaseProduct[];
  businessPayments: PurchasePayment[];
  provider: Person;
  businessDate: Date;
  notes: string;
}
