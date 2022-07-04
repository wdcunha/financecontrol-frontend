import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private readonly API = 'api/business'

  constructor(private httpClient: HttpClient) { }

  getAllBusiness(type: number): Observable<Business[]> {
    return this.httpClient.get<Business[]>(`api/business/type/${type}`).pipe(
        tap(business => console.log(business))
      );
  }

  saveBusiness(data: Business) {
    return this.httpClient.post<Business>(`${this.API}/save`, data).pipe(first());
  }
}
