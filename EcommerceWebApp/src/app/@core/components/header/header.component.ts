import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedDataService } from 'src/app/shared/shared-data/shared-data.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$ !: Observable<boolean>;

  constructor(private authService:AuthService,private sharedDataService:SharedDataService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.sharedDataService.checkLoginStatus();
  }

  onLogout(){
    this.authService.logout();  
  }      
               
}
