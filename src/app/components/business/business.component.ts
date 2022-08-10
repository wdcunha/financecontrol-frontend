import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from '../../models/business.model';
import { BusinessProductService } from '../../services/business-product.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BusinessComponent implements OnInit {

  business$: Observable<Business[]> | undefined;
  entity: string | undefined;
  totalValue: number = 0;
  title: string | undefined;

  displayedColumns = ['cod', 'provider', 'occurenceDate', 'businessAmount', 'payment', 'installments', 'value', 'notes'];

  columnsPaymentToDisplay = ['description', 'size', 'quantity', 'price', 'total', 'notes'];

  columnsToDisplay = ['cod', 'description', 'size', 'quantity', 'price', 'total', 'notes'];

  expandedElement!: Observable<Business[]> | null;

  constructor(private purchasesService: BusinessService, private purchaseProductServ: BusinessProductService,
    private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {

        let businessTypeId = 0;

        switch(params.type) {
          case 'lista-compras': {
            this.title = "Compras"
            this.entity = "Fornecedor"
            businessTypeId = 1;
            break;
          }
          case 'lista-vendas': {
            this.title = "Vendas"
            this.entity = "Cliente"
            businessTypeId = 2;
            break;
          }
          default: {
            this.title = ""
            this.entity = ""
            break;
          }
        }

        this.business$ = this.purchasesService.getAllBusiness(businessTypeId);
        this.calcTotal();
      });
  }

  calcTotal() {

    let varVal;

    const teste = this.business$?.forEach(x => x.map(bt => bt.businessTotal)
    .reduce((acc, val) => acc! +val!, 0));

    console.log(teste);

    const totalPrice = this.business$?.pipe(
      map(x => x),
      map(bt => bt.map(y => y.businessTotal).reduce((acc, val) => acc! + val!, 0))
    );

    totalPrice?.subscribe(x => this.totalValue = x as number);
  }

}
