import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppConstants } from 'src/app/app.constants';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  currentUser=localStorage.getItem(AppConstants.currentUser)
  
  constructor(private db:AngularFirestore,private cartService:CartService) { }

  async placeOrder(address:any){
      let cartProducts=await this.cartService.getCartProducts()
      this.db.collection(AppConstants.orders).add({
        'user':this.currentUser,
        'order':cartProducts,
        'address':address
      })
 
  }

  getOrder(){
    return new Promise<any>((resolve)=> {
      this.db.collection(AppConstants.orders,ref => ref.where('user','==',this.currentUser)).valueChanges({ idField: 'id' }).subscribe(orders => resolve(orders));
      })
  }

  getAllOrders(){
    return new Promise<any>((resolve)=> {
      this.db.collection(AppConstants.orders).valueChanges({ idField: 'id' }).subscribe(orders => resolve(orders));
      })
  }

}
