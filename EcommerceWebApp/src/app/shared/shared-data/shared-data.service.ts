import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PermissionService } from 'src/app/@core/permission/permission.service';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private isLoggedInDataSource = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInDataSource.asObservable();


  constructor(private permissionService:PermissionService) { }

  updateLoginStatus(isLoggedIn:boolean){
      this.isLoggedInDataSource.next(isLoggedIn);
  }

  checkLoginStatus(){
    const currentTime= new Date(Date.now())
    if(localStorage.getItem(AppConstants.token) && localStorage.getItem(AppConstants.expirationDate) && this.isLoggedIn)
    {
      if(localStorage.getItem(AppConstants.expirationDate)! > currentTime.toString())
      {
        this.permissionService.setPermission(localStorage.getItem(AppConstants.role)!)
        this.isLoggedInDataSource.next(true);
      }
    }
    else {
      this.isLoggedInDataSource.next(false);
    }
    return this.isLoggedIn;
  }
}
