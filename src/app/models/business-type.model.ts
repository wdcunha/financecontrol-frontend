import { Business } from './business.model';

export class BusinessType {
  id?: number;
  description: string = '';
  business?: Business[];

  constructor() {}
}
