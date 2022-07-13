import { BusinessPayment } from './../models/business-payment.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessPaymentService {

  private readonly API = 'api/business-payments'

  constructor(private httpClient: HttpClient) { }

  getAllBusinessPayments(): Observable<BusinessPayment[]> {
    return this.httpClient.get<BusinessPayment[]>(this.API).pipe(
      tap(businessPayment => console.log(businessPayment))
      );
  }

  saveBusinessPayment(data: BusinessPayment[]) {
    return this.httpClient.post<BusinessPayment[]>(`${this.API}/save`,data);
  }}
