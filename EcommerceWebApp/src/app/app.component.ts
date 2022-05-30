import { Component } from '@angular/core';
import { Observable} from 'rxjs';
import { AuthService } from './@core/auth/auth.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'EcommerceWebApp';
  isLoggedIn$ !: Observable<boolean>;
  
  constructor(private authService:AuthService, private _location: Location,private router:Router){
  }
  
  ngOnInit(){
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  changeOfRoutes(){
    if(this._location.isCurrentPathEqualTo('/login'))
    this.router.navigate(['/user'])
  }
}
