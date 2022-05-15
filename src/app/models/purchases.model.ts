import { Person } from "./person.model";
import { PurchaseProduct } from "./purchase-product.model";

export interface Purchases {
  id: number;
  productPurchase: PurchaseProduct[];
  provider: Person;
  occurenceDate: Date;
  notes: string;
}
