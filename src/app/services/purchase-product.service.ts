import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseProductService {

  private readonly API = 'api/purchase-products'

  constructor(private httpClient: HttpClient) { }

  getAllPuchaseProducts() {
    return this.httpClient.get<any[]>(this.API).pipe(
      tap(purchaseProducts => console.log(purchaseProducts))
      );
  }
}
