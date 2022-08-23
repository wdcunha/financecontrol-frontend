import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
// import {default as _rollupMoment, Moment} from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person.model';
import { Business } from '../../models/business.model';
import { BusinessService } from '../../services/business.service';
import { Utils } from './../../shared/utils';

// const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
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
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in
    // your application's root module. We provide it at the component level here, due to
    // limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],})
export class BusinessComponent implements OnInit {

  business$!: Observable<Business[]>;
  dataSource!: MatTableDataSource<Business>;
  entities: Person[] = [];
  entityType: string | undefined;
  filters!: FormGroup;
  title: string | undefined;
  totalValue: number = 0;

  displayedColumns = ['cod', 'provider', 'occurenceDate', 'businessAmount', 'payment', 'installments', 'value', 'notes'];

  columnsPaymentToDisplay = ['description', 'size', 'quantity', 'price', 'total', 'notes'];

  columnsToDisplay = ['cod', 'description', 'size', 'quantity', 'price', 'total', 'notes'];

  expandedElement!: Observable<Business[]> | null;

  constructor(
    private purchasesService: BusinessService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        let businessTypeId = 0;

        this.dataSource = new MatTableDataSource();

        this.filters = this.fb.group({
          searchField: new FormControl(null),
          selectEntity: new FormControl(null),
          period: new FormControl(moment()),
        })

        switch(params.type) {
          case 'lista-compras': {
            this.title = "Compras"
            this.entityType = "Fornecedor"
            businessTypeId = 1;
            break;
          }
          case 'lista-vendas': {
            this.title = "Vendas"
            this.entityType = "Cliente"
            businessTypeId = 2;
            break;
          }
          default: {
            this.title = ""
            this.entityType = ""
            break;
          }
        }

        this.business$ = this.purchasesService.getAllBusiness(businessTypeId);

        this.loadBusiness();
      });
  }

  loadBusiness() {
    this.business$.subscribe(result => {

      this.entities = result.map(business => business.entity).filter((value, index,ent) => ent.findIndex(e => e.id === value.id) === index);

      this.dataSource = new MatTableDataSource(result);
      this.calcTotal();
    })
}

  calcTotal() {

    // const totalPrice = this.business$?.pipe(
    //   map(busness => busness.map(bt => bt.businessTotal).reduce((acc, val) => acc! + val!, 0))
    // );

    // totalPrice?.subscribe(x => this.totalValue = x as number);

    this.totalValue = this.dataSource.filteredData.map(v => v.businessTotal).reduce((acc, val) => acc! + val!, 0) as number;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(event: any) {
    this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
      return data.entity.name.toLowerCase() == filter.toLowerCase();
    };

    this.dataSource.filter = event.value;
    this.calcTotal();
  }

  clearFilters() {
    this.dataSource.filter = '';
    this.loadBusiness();
    this.filters.get('searchField')?.reset();
    this.filters.get('selectEntity')?.reset();
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.filters.get('period')?.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.filters.get('period')?.setValue(ctrlValue);
    datepicker.close();

    const month = normalizedMonthAndYear.month() +1;
    const year = normalizedMonthAndYear.year();

    this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
      const monthDays = Utils.getDaysInMonth(year, month);
      const firstDate = Utils.formatYmd(new Date(`${year}-${month}-01`));
      const lastDate = Utils.formatYmd(new Date(`${year}-${month}-${monthDays}`));

      return data.businessDate >= firstDate && data.businessDate <= lastDate;
    };

    this.dataSource.filter = `${year}-${month}`;

    this.calcTotal();
  }

}
