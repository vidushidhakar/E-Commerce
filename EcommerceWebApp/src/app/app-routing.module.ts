import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/auth/auth.guard';
import { AdminLoginComponent } from './@core/components/admin-login/admin-login.component';
import { LoginComponent } from './@core/components/login/login.component';
import { SignupComponent } from './@core/components/signup/signup.component';
import { PermissionGuard } from './@core/permission/permission.guard';

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate: [AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'user',loadChildren:()=>import('./modules/user/user.module').then(m => m.UserModule),canActivate: [AuthGuard, PermissionGuard]},
  {path:'admin',loadChildren:()=>import('./modules/admin/admin.module').then(m => m.AdminModule),canActivate: [AuthGuard, PermissionGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
