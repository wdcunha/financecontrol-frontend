import { Observable } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products$: Observable<Product[]>;

  displayedColumns = ['cod', 'description', 'quantity', 'notes']

  constructor(private productService: ProductService) {
    this.products$ = productService.getAllProducts();
    console.log(this.products$);

  }

  ngOnInit(): void {
  }

}
