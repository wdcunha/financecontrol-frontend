import { User } from './../models/user.model';
import { Business } from '../models/business.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private readonly API = 'api/business'

  constructor(private httpClient: HttpClient) { }

  getAllBusiness(type: string): Observable<Business[]> {
    return this.httpClient.get<Business[]>(`api/business/type/${type}`).pipe(
      tap(business => console.log(business))
      );
  }

  saveBusiness(data: Business): Observable<Business> {
    return this.httpClient.post<Business>(`${this.API}/save`, data).pipe(first());
  }
}
