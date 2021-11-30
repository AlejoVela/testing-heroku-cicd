import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// COMPONENTS
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "@core/core.module";
import { CreateInvoiceComponent } from './feature/invoice/create-invoice/create-invoice.component';
import { AuthComponent } from './feature/auth/auth.component';
import { CreateCustomerComponent } from './feature/customer/create-customer/create-customer.component';
import { CreateProductComponent } from './feature/product/create-product/create-product.component';

//ANGULAR MATERIAL COMPONENTS
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

//SERVICE COMPONENTS
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListInvoicesComponent } from './feature/invoice/list-invoices/list-invoices.component';
import { LeftSidebarComponent } from './feature/home/left-sidebar/left-sidebar.component';




@NgModule({
  declarations: [AppComponent, CreateInvoiceComponent, AuthComponent, CreateCustomerComponent, CreateProductComponent, ListInvoicesComponent, LeftSidebarComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    MatCardModule,
    MatInputModule,
    MatIconModule, 
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
