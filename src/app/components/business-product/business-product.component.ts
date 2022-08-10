import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Business } from 'src/app/models/business.model';
import { BusinessProduct } from './../../models/business-product.model';
import { Product } from './../../models/product.model';
import { BusinessProductService } from './../../services/business-product.service';
import { BusinessService } from './../../services/business.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.scss']
})
export class BusinessProductComponent implements OnInit {

  @Input() businessObj: Business = new Business();
  @Input() businessTitle: string = '';
  @Output() businessProdChanges: EventEmitter<string> = new EventEmitter();

  business$!: Observable<Business[]>;
  busnProdList: BusinessProduct[] = [];
  edit: boolean = false;
  productOptions!: FormGroup;
  product$!: Observable<Product[]>;
  title: string = 'Produtos';

  constructor(
    private route: ActivatedRoute,
    private prodServ: ProductService,
    private businessServ: BusinessService,
    private businessProdServ: BusinessProductService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.product$ = this.prodServ.getAllProducts();
    this.route.queryParams.subscribe((params) => {
      this.resetForm();
      this.addProduct();

      if(this.edit) {
        this.business$ = this.businessServ.getAllBusiness(params.type);
      }
      //TODO: funcionalidade precisa de ajuste que será basicamente usada pra editar
      this.setDefaultValue();
    });
  }

  productsFields(): FormArray {
    return this.productOptions.get('products') as FormArray;
  }

  addProduct() {
    this.productsFields().push(this.newFormGroup());
  }

  removeProduct(index: number) {
    this.productsFields().removeAt(index);
  }

  newFormGroup(): FormGroup {
    let onlyNumbers = "[0-9]*";
    let onlyNumbersAndDecimal = "[0-9,.]*";

    return this.fb.group({
      businessSelection: new FormControl(null),
      productSelection: new FormControl(null, Validators.required),
      qty: new FormControl(null, [Validators.required, Validators.pattern(onlyNumbers)]),
      price: new FormControl(null, [Validators.required, Validators.pattern(onlyNumbersAndDecimal)]),
    });
  }

  setDefaultValue() {
    const selectedType = this.businessObj

    this.productOptions.get('businessSelection')?.setValue(selectedType);
  }

  getBusnProdFormFields(business: Business) {
    (this.productOptions.controls.products as FormArray).controls.forEach(x => {

      const busnProd: BusinessProduct = {
        product: new Product(),
        business: new Business(),
        price: 0,
        quantity: 0
      }

      if(x != undefined && x != null ) {
        busnProd.product = x.get('productSelection')?.value;
        busnProd.business = business;
        busnProd.price = x.get('price')?.value;
        busnProd.quantity = x.get('qty')?.value;

        this.busnProdList.push(busnProd);
      }
    });
  }

  calcProdValue(index: number): number {
    const prod = (this.productOptions.controls.products as FormArray).at(index)

    const price = prod.get('price')?.value;
    const qtd = prod.get('qty')?.value;

    return price * qtd;
  }

  calcTotal() {
    const priceTotal = (this.productOptions.controls.products as FormArray).controls
    .map(x => x.get('price')?.value * x.get('qty')?.value)
    .filter(x => x > 0)
    .reduce((acc, val) => acc + val, 0);

    return priceTotal;
  }
  onSubmit(business: Business) {

    this.getBusnProdFormFields(business);

    this.businessProdServ.saveBusinessProduct(this.busnProdList).subscribe(() => {
      console.warn("Registro de produtos da " + this.title + " de nº " + this.businessObj.id);
      this.snackBar.open(`Registro de produtos da ${this.title} de nº ${this.businessObj.id}`, 'Salvo com Sucesso!', {
              duration: 15000,
      });
    });

    this.resetForm();
    this.addProduct();
  }

  resetForm() {
    this.productOptions = this.fb.group({
      products: this.fb.array([])
    });
    this.productOptions.valueChanges.subscribe(() => {
      this.businessProdChanges.emit(`${this.calcTotal()}`);
    });
  }
}
