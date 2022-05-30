import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { SharedDataService } from 'src/app/shared/shared-data/shared-data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PermissionService } from '../permission/permission.service';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private auth: AngularFireAuth,private notifyService : NotificationService,private sharedDataService:SharedDataService, private router:Router, private db: AngularFirestore, private permissionService:PermissionService) { }

  get isLoggedIn() {
    return this.sharedDataService.checkLoginStatus();
  }

  signupAuthentication(email:string,password:string){
    this.auth.createUserWithEmailAndPassword(email,password).then((result) =>{
      localStorage.setItem(AppConstants.currentUser,email)
      this.notifyService.showSuccess("Signup successfull","")
      this.sharedDataService.updateLoginStatus(true);
      this.router.navigate(['/user']);
    }).catch(error=>{
      this.notifyService.showError(error.message,'Error')
    })
  }

 async loginAuthentication(email:string,password:string){
    // this.auth.signInWithEmailAndPassword(email,password).then(()=>{
    //   localStorage.setItem(AppConstants.currentUser,email)
    //   this.notifyService.showSuccess("Login successfull","")
    //   this.sharedDataService.updateLoginStatus(true);
    //   this.router.navigate(['/user']);
    // }).catch(error=>{
    //   this.notifyService.showError(error.message,'Error')
    // })
    let user=await new Promise<any>((resolve)=> {
      this.db.collection(`${AppConstants.users}/`).doc(email).valueChanges({ idField: 'id' }).subscribe(user => resolve(user));
      })
      
    //console.log(user)
    
      this.auth.signInWithEmailAndPassword(email,password).then((response:any)=>{
        // console.log(response.user._delegate.accessToken)
        const expirationDate=new Date(response.user!._delegate.stsTokenManager.expirationTime).toString()
        localStorage.setItem(AppConstants.currentUser,email)
        localStorage.setItem(AppConstants.token,response.user._delegate.accessToken)
        localStorage.setItem(AppConstants.expirationDate,expirationDate)
        localStorage.setItem(AppConstants.role,user.role)
        this.sharedDataService.updateLoginStatus(true);
        if(user.role=="admin"){
          this.permissionService.setPermission('admin')
          this.router.navigate(['/admin']);}
        else{          
          this.permissionService.setPermission('user')
          this.router.navigate(['/user']);
        }        
        this.notifyService.showSuccess("Login successfull","")
      }).catch(error=>{
        this.notifyService.showError(error.message,'Error')
      })
   
  }

  // adminLoginAuthentication(email:string,password:string){
  //   if(email=='admin@ec.wa' && password=='admin12')
  //   {
  //     this.sharedDataService.updateLoginStatus(true);
  //     this.router.navigate(['/admin']);
  //   }
  //   else
  //   this.notifyService.showError('Incorrect email or password','Error')
  // }

  // async adminLoginAuthentication(email:string,password:string){
  //   let user=await new Promise<any>((resolve)=> {
  //     this.db.collection(`${AppConstants.users}/`).doc(email).valueChanges({ idField: 'id' }).subscribe(user => resolve(user));
  //     })
  //   console.log(user)
  //   if(user.role=="admin"){
  //     this.auth.signInWithEmailAndPassword(email,password).then(()=>{
  //       localStorage.setItem(AppConstants.currentUser,email)
  //       this.notifyService.showSuccess("Login successfull","")
  //       this.sharedDataService.updateLoginStatus(true);
  //       this.permissionService.setPermission(false)
  //       this.router.navigate(['/admin']);
  //     }).catch(error=>{
  //       this.notifyService.showError(error.message,'Error')
  //     })
  //   }
  //   else{
  //     this.notifyService.showError('Incorrect email or password','Error')

  //   }
  // }

  logout() {                    
    localStorage.clear()        
    this.sharedDataService.updateLoginStatus(false);
    this.router.navigate(['/login']);
  }

  addData(details: any) {
    this.db.collection(`${AppConstants.users}`).doc(details.email).set({
      firstname:details.firstname,
      lastname:details.lastname,
      username:details.username,
      email:details.email,
      role:'user'
    })
  }
  
}
