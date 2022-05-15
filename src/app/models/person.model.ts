import { TypePerson } from "./type-person.model";

export interface Person {
  id: number;
  type: TypePerson;
  numDoc: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}
