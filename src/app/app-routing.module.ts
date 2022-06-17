import { BusinessComponent } from './components/business/business.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { TypePersonComponent } from './components/type-person/type-person.component';
import { BusinessFormComponent } from './components/business/business-form/business-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main' },
  { path: 'main', component: TypePersonComponent },
  { path: 'person', component: PersonComponent },
  { path: 'type-person', component: TypePersonComponent },
  { path: 'product', component: ProductComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'business-form', component: BusinessFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
