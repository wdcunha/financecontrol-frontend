import { Product } from './product.model';

export interface PurchaseProduct {
  price: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}
