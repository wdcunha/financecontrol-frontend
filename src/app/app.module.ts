import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypePersonComponent } from './components/type-person/type-person.component';
import { PersonComponent } from './components/person/person.component';
import { ProductComponent } from './components/product/product.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SalesComponent } from './components/sales/sales.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)


@NgModule({
  declarations: [
    AppComponent,
    TypePersonComponent,
    PersonComponent,
    ProductComponent,
    PurchasesComponent,
    SalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: "pt-BR"
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
