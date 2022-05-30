import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  currentUser=localStorage.getItem(AppConstants.currentUser)
  id:string|undefined
  
  constructor(private db:AngularFirestore) { 
    if(this.currentUser==null){
      this.id=undefined
    }
    else{
      this.id=this.currentUser
    }
  }

async addProductToCart(productId:string, qty:number = 1){
  this.db.collection(`${AppConstants.cart}/${this.id}/${AppConstants.productsCollection}`).doc(productId).set({'qty':qty})
}

  getCartProducts(){
    return new Promise<any>((resolve)=> {
      this.db.collection(`${AppConstants.cart}/${this.id}/${AppConstants.productsCollection}`).valueChanges({ idField: 'id' }).subscribe(product => resolve(product));
      })
  }

  removeCartProduct(id:string){
    this.db.doc(`${AppConstants.cart}/${this.id}/${AppConstants.productsCollection}/${id}`).delete()
  }

  getProductQuantity(productId:string){
    return new Promise<any>((resolve)=> {
      this.db.collection(`${AppConstants.cart}/${this.id}/${AppConstants.productsCollection}`).doc(productId).valueChanges({ idField: 'id' })
      .subscribe((product) => resolve(product));;
      })
  }
}
