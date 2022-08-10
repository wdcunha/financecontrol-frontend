import { DecimalPipe } from '@angular/common';
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

  business$!: Observable<Business[]>;
  busnPayList: BusinessPayment[] = [];
  calc: number = 0;
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
      private fb: FormBuilder,
      private decimalPipe: DecimalPipe
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
    this.getFormFields(this.businessObj);
  }

  removePayment(index: number) {
    this.paymentFields().removeAt(index);
  }

  newFormGroup(): FormGroup {
    let onlyNumbers = "[0-9]*";
    let onlyNumbersAndDecimal = "[0-9.,]*";

    return this.fb.group({
      paymentDate: new FormControl(this.startDate),
      businessSelection: new FormControl(null),
      paymentSelection: new FormControl(null, Validators.required),
      installment: new FormControl(null, [Validators.required, Validators.pattern(onlyNumbers)]),
      installmentValue: new FormControl(null, [Validators.required, Validators.pattern(onlyNumbersAndDecimal)]),
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

      if(formArr != undefined && formArr != null && business.id != null) {
        const installOrig = formArr.get('installment')?.value;
        const paymentType = formArr.get('paymentSelection')?.value;

        for (let index = 1; index <= installOrig; index++) {
          busnPay = new BusinessPayment();

          busnPay.amount = Utils.strToDouble(formArr.get('installmentValue')?.value);
          if (paymentType.description == 'Dinheiro') {
            console.log('dinheiro');
            busnPay.payDate = Utils.formatYmd(formArr.get('paymentDate')?.value);
          } else {
            console.log('outras formas');
            busnPay.payDate = Utils.incrementMonth(formArr.get('paymentDate')?.value, index);
          }
          busnPay.amount = formArr.get('installmentValue')?.value;
          busnPay.payed = formArr.get('paidChkbox')?.value;
          busnPay.payment = formArr.get('paymentSelection')?.value;
          busnPay.business = business;

          busnPay.installment = index;

          this.busnPayList.push(busnPay);
        }
        // busnPay.business = x.get('businessSelection')?.value; TODO: colocar num if pra qdo for edit
      }
    });
  }

  calculateInstallmentValue(value: any, index: number) {
    const size = (this.paymentForm.controls.payments as FormArray).length;

    let total: string = '0';
    if (this.businessObj.total?.toString !== undefined && size == 1) {
      total = this.businessObj.total;

      this.calc = Number(total) / Number(value.target.value);

      console.log(this.calc);

    } else {
      console.log(this.calc);
      this.calc = this.calc / Number(value.target.value);
      console.log(this.calc);
    }

    console.log(this.calc);


    (this.paymentForm.controls.payments as FormArray).at(index).get('installmentValue')?.patchValue(this.calc);

  }

  updateCalc(index: number) {

    if (value != this.calc) {
  calculateInstallmentValue(value: any) {
    console.log(value.target.value);

      this.calc = this.calc - Number(value);
    }
    console.log(this.calc);
  }

  onSubmit(business: Business) {
    this.getFormFields(business);

    this.businPayServ.saveBusinessPayment(this.busnPayList).subscribe(() => {
      console.warn("Registro de pagamento com nº " + this.businessObj.id);
      this.snackBar.open(`Registro de pagamento com nº ${this.businessObj.id}`, 'Salvo com Sucesso!', {
              duration: 15000,
      });
      this.resetForm();
      this.addPaymentFields();
      this.busnPayList = [];
    });
  }
}
