import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  category!:string
  subcategory!:string
  productId!:string
  inCart!:any
  product!:any
 
  constructor(private router:ActivatedRoute,private dataService:DataService,private cartService:CartService,private notifyService:NotificationService,private route:Router) {
    this.router.params.subscribe( async params => {
      this.category=params['category'] 
      this.subcategory=params['subcategory']
      this.productId=params['productid']
      this.product=await this.dataService.getSingleProduct(this.productId)
      this.inCart=await this.cartService.getProductQuantity(this.productId)
      //console.log(this.inCart.qty)
    }) 
   }

  ngOnInit(): void {
  }

  addToCart(productId:string,quantity:any){
    this.cartService.addProductToCart(productId,Number(quantity))
    this.notifyService.showSuccess('Added to Cart','Product Added')
    this.route.navigate(['/user/cart'])
  }

  changeQantity( quantity: any) {
    if(quantity.value<0)
    quantity.value=1
    if(this.inCart.qty)
    this.cartService.addProductToCart(this.productId,quantity.value)
  }

  incrementQuantity(){
    this.inCart.qty+=1
    this.cartService.addProductToCart(this.productId,this.inCart.qty)

  }

  decrementQuantity(){
    this.inCart.qty-=1
    if(this.inCart.qty<1)
   this.cartService.removeCartProduct(this.productId)
   else
    this.cartService.addProductToCart(this.productId,this.inCart.qty)
  }
  
  
}
