import { Business } from 'src/app/models/business.model';
import { Product } from './product.model';

export interface BusinessProduct {
  price: number;
  product?: Product;
  business?: Business;
  quantity: number;
  totalPrice?: number;
}
