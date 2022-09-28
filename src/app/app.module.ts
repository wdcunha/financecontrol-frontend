import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { authInterceptorProviders } from './../helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BusinessPaymentComponent } from './components/business-payment/business-payment.component';
import { BusinessProductComponent } from './components/business-product/business-product.component';
import { BusinessFormComponent } from './components/business/business-form/business-form.component';
import { BusinessComponent } from './components/business/business.component';
import { LoginComponent } from './components/login/login.component';
import { PersonComponent } from './components/person/person.component';
import { ProductComponent } from './components/product/product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TypePersonComponent } from './components/type-person/type-person.component';

registerLocaleData(localePt)

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AppComponent,
    TypePersonComponent,
    PersonComponent,
    ProductComponent,
    BusinessComponent,
    BusinessFormComponent,
    BusinessProductComponent,
    BusinessPaymentComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
