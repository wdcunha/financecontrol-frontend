import { Business } from './business.model';

export interface BusinessType {
  id?: number;
  description: string;
  business?: Business[];
}
