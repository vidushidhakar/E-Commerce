import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  
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

  async addProductToWishlist(productId:string){
    this.db.collection(`${AppConstants.wishlist}/${this.id}/${AppConstants.productsCollection}`).doc(productId).set({})
  }

  getWishlistProducts(){
    return new Promise<any>((resolve)=> {
      this.db.collection(`${AppConstants.wishlist}/${this.id}/${AppConstants.productsCollection}`).valueChanges({ idField: 'id' }).subscribe(products => resolve(products));
      })
  }

  removeWishlistProduct(id:string){
    this.db.doc(`${AppConstants.wishlist}/${this.id}/${AppConstants.productsCollection}/${id}`).delete()
  }

}