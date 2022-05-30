import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})

export class WishlistComponent implements OnInit {

  wishlistProducts:any[]=[]

  constructor(private wishListService:WishlistService,private dataService:DataService,private cartService:CartService,private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.getWishlistProducts()
  }

  async getWishlistProducts(){
    this.wishlistProducts=[]
    let wishlistProducts=await this.wishListService.getWishlistProducts()
    for(let product of wishlistProducts){
      let productDetails= await this.dataService.getSingleProduct(product.id)
      this.wishlistProducts.push(productDetails)
    }
  }

  removeProductFromWishlist(productid:string){
    this.wishListService.removeWishlistProduct(productid)
    this.getWishlistProducts()
  }

  addToCart(productid:string){
    this,this.wishListService.removeWishlistProduct(productid)
    this.cartService.addProductToCart(productid)
    this.notifyService.showSuccess('Added to Cart','Product Added')
    this.getWishlistProducts()
  }

}
