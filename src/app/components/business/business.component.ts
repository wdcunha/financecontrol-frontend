import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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

  title: string | undefined;
  entity: string | undefined;

  business$: Observable<Business[]> | undefined;

  displayedColumns = ['cod', 'provider', 'occurenceDate', 'businessAmount', 'payment', 'installments', 'value', 'notes'];

  columnsPaymentToDisplay = ['description', 'size', 'quantity', 'price', 'total', 'notes'];

  columnsToDisplay = ['cod', 'description', 'size', 'quantity', 'price', 'total', 'notes'];

  expandedElement!: Observable<Business[]> | null;

  constructor(private purchasesService: BusinessService, private purchaseProductServ: BusinessProductService,
    private route: ActivatedRoute) {

    }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        console.log(params.type);
        this.business$ = this.purchasesService.getAllBusiness(params.type);
        console.log(this.business$);

        switch(params.type) {
          case '1': {
            this.title = "Compras"
            this.entity = "Fornecedor"
            break;
          }
          case '2': {
            this.title = "Vendas"
            this.entity = "Cliente"
            break;
          }
          default: {
            this.title = ""
            this.entity = ""
            break;
          }
        }
      });
  }

}
