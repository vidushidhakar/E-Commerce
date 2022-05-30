import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartProductList: any[] = [];
 
  constructor(
    private cartService: CartService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getCartProducts();
  }

  async getCartProducts() {
    this.cartProductList = [];
    let cartProducts = await this.cartService.getCartProducts();
    for (let product of cartProducts) {
      let productDetails = await this.dataService.getSingleProduct(product.id);
      productDetails.qty = product.qty;
      this.cartProductList.push(productDetails);
    }
  }

  removeProductFromCart(id: string) {
    this.cartService.removeCartProduct(id);
    this.getCartProducts();
  }

  // changeQantity(id: any, quantity: any) {
  //   if(quantity<0)
  //   quantity=1
  //   this.cartService.addProductToCart(id, quantity) 
  //     this.getCartProducts();
  // }

  
  incrementQuantity(id:string,qty:any){
    let quantity=Number(qty.value)
    quantity+=1
    qty.value=quantity
    this.cartService.addProductToCart(id,quantity)
    this.getCartProducts();
  }

  decrementQuantity(id:string,qty:any){
    let quantity=Number(qty.value)
    quantity-=1
    qty.value=quantity
    if(quantity<1)
   {this.cartService.removeCartProduct(id)
    this.getCartProducts()}
   else
    {
      this.cartService.addProductToCart(id,quantity)
      this.getCartProducts();
    }
  }
}
