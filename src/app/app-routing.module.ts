import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
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
  { path: 'business/:type', component: BusinessComponent },
  { path: 'business-form/:type', component: BusinessFormComponent },
  { path: 'cadastrar-usuario', component: RegisterComponent , data: { role: ['ROLE_ADMIN']}},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'moderator', component: BoardModeratorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
