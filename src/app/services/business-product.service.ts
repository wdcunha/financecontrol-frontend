import { BusinessProduct } from './../models/business-product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessProductService {

  private readonly API = 'api/business-products'

  constructor(private httpClient: HttpClient) { }

  getAllBusinessProducts() {
    return this.httpClient.get<any[]>(this.API).pipe(
      tap(businessProducts => console.log(businessProducts))
      );
  }

  saveBusinessProduct(data: BusinessProduct[]) {
    return this.httpClient.post<BusinessProduct[]>(`${this.API}/save-all`,data);
  }
}
