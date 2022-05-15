import { TypePerson } from './../models/type-person.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypePersonService {
  private readonly API = 'api/person-types'

  constructor(private httpClient: HttpClient) { }

  getAllTypes() {
    return this.httpClient.get<TypePerson[]>(this.API)
    .pipe(
      tap(types => console.log(types))
    );
  }
}
