import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchases } from './../../models/purchases.model';
import { PurchaseProductService } from './../../services/purchase-product.service';
import { PurchasesService } from './../../services/purchases.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PurchasesComponent implements OnInit {

  purchases$: Observable<Purchases[]>;

  displayedColumns = ['cod', 'provider', 'occurenceDate', 'purchaseAmount', 'notes'];

  columnsToDisplay = ['cod', 'description', 'size', 'quantity', 'price', 'total', 'notes'];

  expandedElement!: Observable<Purchases[]> | null;

  constructor(private purchasesService: PurchasesService, private purchaseProductServ: PurchaseProductService) {
    this.purchases$ = purchasesService.getAllPuchases();

    console.log(this.purchases$);
  }

  ngOnInit(): void {
  }

}
