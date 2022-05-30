import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // if(!route.url[0]){
      //   console.log("login")
      //   return true
      // }
      return this.authService.isLoggedIn 
      .pipe(
         take(1),                              
        map((isLoggedIn: boolean) => { 
          if(isLoggedIn==true && !route.url[0]){
            this.router.navigate(['user']);
            return false
          }     
          if (isLoggedIn==false){
            this.router.navigate(['login']);  
            return false;
          }
          return true;
        })
      )
  }
}
