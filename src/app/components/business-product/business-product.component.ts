import { Product } from './../../models/product.model';
import { BusinessProduct } from './../../models/business-product.model';
import { BusinessProductService } from './../../services/business-product.service';
import { BusinessService } from './../../services/business.service';
import { Business } from 'src/app/models/business.model';
import { ProductService } from './../../services/product.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.scss']
})
export class BusinessProductComponent implements OnInit {

  @Input() businessObj: Business = new Business();
  @Input() businessTitle: string = '';
  @Input() businessType: number = 0;

  business$!: Observable<Business[]>;
  edit: boolean = false;
  produtcOptions!: FormGroup;
  product$!: Observable<Product[]>;
  title: string = 'Produtos';

  constructor(
    private route: ActivatedRoute,
    private prodServ: ProductService,
    private businessServ: BusinessService,
    private businessProdServ: BusinessProductService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.product$ = this.prodServ.getAllProducts();
    this.route.queryParams.subscribe((params) => {
      this.resetForm();
      this.addProduct();
      console.log(this.businessType);
      console.log(params.type);

      this.business$ = this.businessServ.getAllBusiness(params.type);
      this.setDefaultValue();
    });
  }

  productsFields(): FormArray {
    return this.produtcOptions.get('products') as FormArray;
  }

  addProduct() {
    this.productsFields().push(this.newFormGroup());
  }

  removeProduct(index: number) {
    this.productsFields().removeAt(index);
  }

  newFormGroup(): FormGroup {
    return this.fb.group({
      businessSelection: new FormControl([null, Validators.required]),
      productSelection: new FormControl([null, Validators.required]),
      qty: new FormControl([null]),
      price: new FormControl([null]),
    });
  }

  setDefaultValue() {
    const selectedType = this.businessObj
    console.log(selectedType);

    this.produtcOptions.get('businessSelection')?.setValue(selectedType);
  }

  onSubmit() {
    const busnProdList: BusinessProduct[] = [];

    (this.produtcOptions.controls.products as FormArray).controls.forEach(x => {

      const busnProd: BusinessProduct = {
        product: new Product(),
        business: new Business(),
        price: 0,
        quantity: 0
      }

      if(x != undefined && x != null ) {
        busnProd.product = x.get('productSelection')?.value;
        busnProd.business = this.businessObj;
        busnProd.price = x.get('price')?.value;
        busnProd.quantity = x.get('qty')?.value;

        busnProdList.push(busnProd);
      }
    });

    this.businessProdServ.saveBusinessProduct(busnProdList).subscribe(() => {
      console.warn("Registro de produtos da " + this.title + " de nº " + this.businessObj.id);
      this.snackBar.open(`Registro de produtos da ${this.title} de nº ${this.businessObj.id}`, 'Salvo com Sucesso!', {
              duration: 15000,
      });
    });

    // this.resetForm();
  }

  resetForm() {
    this.produtcOptions = this.fb.group({
      products: this.fb.array([])
    });
  }
}
