import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  permission : string=''
  constructor() { }

  setPermission(role:string){
    this.permission = role;
  }
  
  hasPermission(): string {
  return this.permission;    
}
}
