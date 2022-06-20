import { Business } from './../../../models/business.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Person } from 'src/app/models/person.model';
import { BusinessType } from '../../../models/business-type.model';
import { BusinessTypeService } from '../../../services/business-type.service';
import { BusinessService } from '../../../services/business.service';
import { PersonService } from '../../../services/person.service';

@Component({
  selector: 'app-form-business',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent implements OnInit {

  businesType: BusinessType | undefined;
  businesType$: BusinessType[] = [];
  businessTypeDescrip!: string;
  businessTypeId!: number;
  edit: boolean = false;
  entities: Person[] = [];
  entities$!: Observable<Person[]>;
  entityType: string | undefined;
  formType: string | undefined;
  options!: FormGroup;
  selected: string = '';
  startDate = new Date();
  title: string | undefined;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private bs: BusinessService,
              private personServ: PersonService, private btype: BusinessTypeService) {}

  async ngOnInit() {
    this.options = this.fb.group({
      occuranceDate: new FormControl(this.startDate),
      entities: new FormControl([null, Validators.required]),
      bustype: new FormControl([null]),
      noteText: new FormControl([null]),
    })

    this.entities$ = this.personServ.getAllPersons();

    this.route.queryParams.subscribe(params => {
      switch(params.type) {
        case '1': {
          this.title = "Compras"
          this.entityType = "Fornecedor"
          this.businessTypeId = params.type
          this.businessTypeDescrip = "Tipo Negócio"
          this.formType = "entradas"
          this.setEntitiesByBusinessType(params.type);
          break;
        }
        case '2': {
          this.title = "Vendas"
          this.entityType = "Cliente"
          this.businessTypeId = params.type
          this.businessTypeDescrip = "Tipo Negócio"
          this.formType = "saídas"
          this.setEntitiesByBusinessType(params.type);
          break;
        }
        default: {
          this.title = ""
          this.entityType = ""
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
    const selectedType = this.businesType$.find(t => t.id == this.businessTypeId);

    this.options.get('bustype')?.setValue(selectedType);
  }

  setEntitiesByBusinessType(type: number) {
    this.entities$.pipe(map(x => x.filter(t => t.type.id == type))).subscribe(p => this.entities = p);
  }

  onSubmit(event: Business) {
    console.log(event);

  }
}
