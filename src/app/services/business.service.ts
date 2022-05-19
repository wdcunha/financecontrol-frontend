import { Business } from '../models/business.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private readonly API = 'api/business'

  constructor(private httpClient: HttpClient) { }

  getAllBusiness(type: string) {
    return this.httpClient.get<Business[]>(`api/business/type/${type}`).pipe(
      tap(business => console.log(business))
      );
  }
}
