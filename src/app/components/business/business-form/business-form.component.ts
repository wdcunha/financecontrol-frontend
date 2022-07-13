import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from 'src/app/models/person.model';
import { BusinessTypeService } from '../../../services/business-type.service';
import { BusinessService } from '../../../services/business.service';
import { PersonService } from '../../../services/person.service';
import { BusinessType } from './../../../models/business-type.model';
import { Business } from './../../../models/business.model';
import { BusinessPaymentComponent } from './../../business-payment/business-payment.component';
import { BusinessProductComponent } from './../../business-product/business-product.component';

@Component({
  selector: 'app-form-business',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent implements OnInit {

  @ViewChild(BusinessProductComponent)
  private businessProdComp!: BusinessProductComponent;

  @ViewChild(BusinessPaymentComponent)
  private businessPayComp!: BusinessPaymentComponent;

  businessObj: Business = new Business();
  businesType: BusinessType = new BusinessType();
  businesType$: BusinessType[] = [];
  businessTypeDescrip!: string;
  businessTypeId!: number;
  edit: boolean = false;
  entities: Person[] = [];
  entities$!: Observable<Person[]>;
  entityType: string | undefined;
  formType: string | undefined;
  options!: FormGroup;
  isSaved: boolean = true;
  selected: string = '';
  startDate = new Date();
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bs: BusinessService,
    private personServ: PersonService,
    private btype: BusinessTypeService,
    private snackBar: MatSnackBar,
  ) {
  }

  async ngOnInit() {

    this.entities$ = this.personServ.getAllPersons();

    this.route.queryParams.subscribe((params) => {
      this.resetForm();
      switch (params.type) {
        case '1': {
          this.title = 'Compra';
          this.entityType = 'Fornecedor';
          this.businessTypeId = params.type;
          this.businessTypeDescrip = 'Tipo Negócio';
          this.formType = 'entrada';
          this.setEntitiesByBusinessType(2);
          break;
        }
        case '2': {
          this.title = 'Venda';
          this.entityType = 'Cliente';
          this.businessTypeId = params.type;
          this.businessTypeDescrip = 'Tipo Negócio';
          this.formType = 'saída';
          this.setEntitiesByBusinessType(1);
          break;
        }
        default: {
          this.title = '';
          this.entityType = '';
          break;
        }
      }

      this.options.get('entities')?.reset();

      this.setDefaultValue();
    });

    this.getBusinesstype();
  }

  getBusinesstype() {
    this.btype.getAllBusinessType().subscribe((type: BusinessType[]) => {
      this.businesType$ = type;
      this.setDefaultValue();
    });
  }

  setDefaultValue() {
    const selectedType = this.businesType$.find(
      (t) => t.id == this.businessTypeId
    );

    this.options.get('bustype')?.setValue(selectedType);
  }

  setEntitiesByBusinessType(type: number) {
    this.entities$
      .pipe(map((x) => x.filter((t) => t.type.id == type)))
      .subscribe((p) => (this.entities = p));
  }

  onSubmit() {
    const formatYmd = (date: Date) => date.toISOString().slice(0, 10);
    const dpicker = this.options.get('occuranceDate')?.value;
    const entitySelected = this.options.get('entities')?.value;
    const btype = this.options.get('bustype')?.value;
    const notesh = this.options.get('noteText')?.value;
    const busn: Business = {
      businessDate: formatYmd(dpicker),
      businessType: btype,
      entity: entitySelected,
      notes: notesh
    }

    this.bs.saveBusiness(busn).subscribe(saved => {
      console.warn("Registro de " + this.title + " " + saved.id + ", " + saved.entity.name);

      this.businessObj = saved;
      this.businessProdComp.onSubmit(saved);
      this.businessPayComp.onSubmit(saved);


      this.snackBar.open(`Registro de  ${this.title}, ${saved.id}, ${saved.entity.name}`, 'Salvo com Sucesso!', {
        duration: 15000,
      });

      this.resetForm();
    });
  }

  resetForm() {
    this.options = this.fb.group({
      occuranceDate: new FormControl(this.startDate),
      entities: new FormControl([null, Validators.required]),
      bustype: new FormControl([null]),
      noteText: new FormControl([null]),
    });
  }
}
