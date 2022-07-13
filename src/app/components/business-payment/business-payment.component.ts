import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessPayment } from './../../models/business-payment.model';
import { PaymentTypes } from './../../models/payment-types.model';
import { BusinessPaymentService } from './../../services/business-payment.service';
import { PaymentTypesService } from './../../services/payment-types.service';
import { Utils } from './../../shared/utils';

@Component({
  selector: 'app-business-payment',
  templateUrl: './business-payment.component.html',
  styleUrls: ['./business-payment.component.scss']
})
export class BusinessPaymentComponent implements OnInit {

  @Input() businessObj: Business = new Business();
  @Input() businessTitle: string = '';
  // @Output() businessPayment = new EventEmitter<BusinessPayment[]>();

  business$!: Observable<Business[]>;
  busnPayList: BusinessPayment[] = [];
  edit: boolean = false;
  paymentForm!: FormGroup;
  payTypes$!: Observable<PaymentTypes[]>;
  startDate = new Date();

  constructor(
      private route: ActivatedRoute,
      private payTypesServ: PaymentTypesService,
      private businessServ: BusinessService,
      private businPayServ: BusinessPaymentService,
      private snackBar: MatSnackBar,
      private fb: FormBuilder
      ) { }

  ngOnInit(): void {
    this.payTypes$ = this.payTypesServ.getAllBusinessType();
    this.route.queryParams.subscribe((params) => {
      this.resetForm();
      this.addPaymentFields();

      if(this.edit) {
        this.business$ = this.businessServ.getAllBusiness(params.type);
      }

      // TODO: inserir funcionalidade para carregar business default na dropdown qdo estiver no modo edit
    });
  }

  paymentFields(): FormArray {
    return this.paymentForm.get('payments') as FormArray;
  }

  addPaymentFields() {
    this.paymentFields().push(this.newFormGroup());
  }

  removePayment(index: number) {
    this.paymentFields().removeAt(index);
  }

  newFormGroup(): FormGroup {
    return this.fb.group({
      paymentDate: new FormControl(this.startDate),
      businessSelection: new FormControl(null),
      paymentSelection: new FormControl(null, Validators.required),
      installment: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      installmentValue: new FormControl(null, [Validators.required, Validators.pattern('[0-9,]*')]),
      paidChkbox: new FormControl(false),
    });
  }

  resetForm() {
    this.paymentForm = this.fb.group({
      payments: this.fb.array([])
    });
  }

  getFormFields(business: Business) {
    (this.paymentForm.controls.payments as FormArray).controls.forEach(formArr => {

      let busnPay: BusinessPayment = new BusinessPayment();
      this.busnPayList = [];

      if(formArr != undefined && formArr != null ) {
        const installOrig = formArr.get('installment')?.value;

        for (let index = 1; index <= installOrig; index++) {
          busnPay = new BusinessPayment();

          busnPay.amount = Utils.strToDouble(formArr.get('installmentValue')?.value);
          busnPay.payDate = Utils.incrementMonth(formArr.get('paymentDate')?.value, index);
          console.log(Utils.incrementMonth(formArr.get('paymentDate')?.value, index));
          busnPay.payed = formArr.get('paidChkbox')?.value;
          busnPay.payment = formArr.get('paymentSelection')?.value;
          busnPay.business = business;

          busnPay.installment = index;
          console.log(busnPay);

          this.busnPayList.push(busnPay);
          console.log(this.busnPayList);

        }
        // busnPay.business = x.get('businessSelection')?.value; TODO: colocar num if pra qdo for edit
      }
    });
  }

  calculateInstallmentValue(value: any) {
    console.log(value.target.value);

  }

  onSubmit(business: Business) {
    this.getFormFields(business);

    console.log(this.busnPayList);

    this.businPayServ.saveBusinessPayment(this.busnPayList).subscribe(() => {
      console.warn("Registro de pagamento com nº " + this.businessObj.id);
      this.snackBar.open(`Registro de pagamento com nº ${this.businessObj.id}`, 'Salvo com Sucesso!', {
              duration: 15000,
      });
    });

    this.newFormGroup();
  }
}
