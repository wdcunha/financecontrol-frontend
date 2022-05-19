import { Purchases } from './../models/purchases.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private readonly API = 'api/business'

  constructor(private httpClient: HttpClient) { }

  getAllPuchases() {
    return this.httpClient.get<Purchases[]>(this.API).pipe(
      tap(purchases => console.log(purchases))
      );
  }
}
