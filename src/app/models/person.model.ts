import { TypePerson } from "./type-person.model";

export class Person {
  id?: number;
  type: TypePerson = new TypePerson();
  numDoc: string = '';
  name: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
}
