import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { UsersComponent } from './components/users/users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SubcatergoriesComponent } from './components/subcatergories/subcatergories.component';
import { ProductsComponent } from './components/products/products.component';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './components/order-details/order-details.component';


@NgModule({
  declarations: [
    NavbarAdminComponent,
    UsersComponent,
    CategoriesComponent,
    SubcatergoriesComponent,
    ProductsComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
