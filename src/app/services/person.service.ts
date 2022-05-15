import { tap } from 'rxjs/operators';
import { Person } from './../models/person.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly API = 'api/person';

  constructor(private httpClient: HttpClient) { }

  getAllPersons() {
    return this.httpClient.get<Person[]>(this.API).pipe(
      tap(persons => console.log(persons)
      )
    )
  }
}
