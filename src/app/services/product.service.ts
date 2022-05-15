import { Product } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = 'api/product'

  constructor(private httpClient: HttpClient) { }

  getAllProducts(){
    return this.httpClient.get<Product[]>(this.API).pipe(
      tap(products => console.log(products))
      );
  }
}
