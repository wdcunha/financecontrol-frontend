import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentTypes } from './../models/payment-types.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypesService {

  private readonly API = 'api/payment-types'

  constructor(private httpClient: HttpClient) { }

  getAllBusinessType(): Observable<PaymentTypes[]> {
    return this.httpClient.get<PaymentTypes[]>(this.API);
  }
}
