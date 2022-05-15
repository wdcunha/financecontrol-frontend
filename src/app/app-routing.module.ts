import { PurchasesComponent } from './components/purchases/purchases.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { TypePersonComponent } from './components/type-person/type-person.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: TypePersonComponent },
  { path: 'person', component: PersonComponent },
  { path: 'type-person', component: TypePersonComponent },
  { path: 'product', component: ProductComponent },
  { path: 'purchases', component: PurchasesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
