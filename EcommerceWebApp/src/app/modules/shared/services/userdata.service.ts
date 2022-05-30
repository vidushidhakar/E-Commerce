import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  
  constructor(private db:AngularFirestore) { }

  getUserDetails(userid:string){
    return new Promise<any>((resolve)=> {
      this.db.collection(AppConstants.users).doc(userid).valueChanges({ idField: 'id' }).subscribe(user => resolve(user))
    })
  }

}
