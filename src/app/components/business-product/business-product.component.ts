import { Component, Input, OnInit } from '@angular/core';
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
import { Utils } from './../../shared/utils';

@Component({
  selector: 'app-business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.scss']
})
export class BusinessProductComponent implements OnInit {

  @Input() businessObj: Business = new Business();
  @Input() businessTitle: string = '';

  business$!: Observable<Business[]>;
  busnProdList: BusinessProduct[] = [];
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

      if(this.edit) {
        this.business$ = this.businessServ.getAllBusiness(params.type);
      }
      //TODO: funcionalidade precisa de ajuste que será basicamente usada pra editar
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
    let numPattern = "[0-9]*"
    return this.fb.group({
      businessSelection: new FormControl(null),
      productSelection: new FormControl(null, Validators.required),
      qty: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')]),
      price: new FormControl(null, [Validators.required, Validators.pattern('[0-9,]*')]),
    });
  }

  setDefaultValue() {
    const selectedType = this.businessObj

    this.produtcOptions.get('businessSelection')?.setValue(selectedType);
  }

  getBusnProdFormFields(business: Business) {
    (this.produtcOptions.controls.products as FormArray).controls.forEach(x => {

      const busnProd: BusinessProduct = {
        product: new Product(),
        business: new Business(),
        price: 0,
        quantity: 0
      }

      if(x != undefined && x != null ) {
        busnProd.product = x.get('productSelection')?.value;
        busnProd.business = business;
        busnProd.price = Utils.strToDouble(x.get('price')?.value);
        busnProd.quantity = x.get('qty')?.value;

        this.busnProdList.push(busnProd);
      }
    });
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
  }

  resetForm() {
    this.produtcOptions = this.fb.group({
      products: this.fb.array([])
    });
  }
}
