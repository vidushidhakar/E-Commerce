import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/@core/permission/permission.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductsComponent } from './components/products/products.component';
import { SubcatergoriesComponent } from './components/subcatergories/subcatergories.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:"",component:UsersComponent},
  {path:"users",component:UsersComponent},
  {path:"categories",component:CategoriesComponent},
  {path:"subcatergories",component:SubcatergoriesComponent},
  {path:"products",component:ProductsComponent},
  {path:"orders",component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
