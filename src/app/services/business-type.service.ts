import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusinessType } from './../models/business-type.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  private readonly API = 'api/business-types'

  constructor(private httpClient: HttpClient) { }

  getAllBusinessType(): Observable<BusinessType[]> {
    return this.httpClient.get<BusinessType[]>(this.API);
  }
}
