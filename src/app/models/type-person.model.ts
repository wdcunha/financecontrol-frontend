import { Person } from 'src/app/models/person.model';
export interface TypePerson {
  id: number;
  description: string;
  person?: Person;
}
