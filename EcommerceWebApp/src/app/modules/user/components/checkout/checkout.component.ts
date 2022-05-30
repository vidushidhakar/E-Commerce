import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { CartService } from '../../../shared/services/cart.service';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  cartProductList:any[]=[]
  totalPrice:number=0
  // title = 'google-places-autocomplete';
  // userAddress: string = ''
  // userLatitude: string = ''
  // userLongitude: string = ''

  countryList: Array<any> = [
    { name: 'India', cities: ['Jaipur', 'Delhi', 'Pune','Udaipur']},
    { name: 'Germany', cities: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', cities: ['Barcelona'] },
    { name: 'USA', cities: ['Downers Grove'] },
    { name: 'Mexico', cities: ['Puebla'] },
    { name: 'China', cities: ['Beijing'] },
  ];
  cities!: Array<any>;
  changeCountry(inputCountry: any) {
    this.cities = this.countryList.find(country => country.name == inputCountry.value).cities;
  }
 

  constructor(private cartService:CartService,private dataService:DataService,private ordersService:OrdersService,private router:Router,private notifyService:NotificationService,
    ) { }

  ngOnInit(): void {
    this.getCartProducts()
  }

  // handleAddressChange(address: any) {
  //   console.log("here")
  //   this.userAddress = address.formatted_address
  //   this.userLatitude = address.geometry.location.lat()
  //   this.userLongitude = address.geometry.location.lng()
  // }

  async getCartProducts(){
    this.cartProductList=[]
    let cartProducts=await this.cartService.getCartProducts()
    for(let product of cartProducts){
      let productDetails= await this.dataService.getSingleProduct(product.id)
      productDetails.qty=product.qty
      this.cartProductList.push(productDetails)
    }
    this.totalPrice=this.totalProductsPrice()
  }

  removeProductFromCart(id:string){
    this.cartService.removeCartProduct(id)
    this.getCartProducts()
  }

  totalProductsPrice(){
    let price:number=0
    for(let product of this.cartProductList){
     price+= (product.qty*product.price)
    }
    return price
  }

  addAddress(address:any){
    console.log(address.value)
    this.ordersService.placeOrder(address.value)
    for(let product of this.cartProductList){
      this.cartService.removeCartProduct(product.id)
    }
    this.notifyService.showSuccess('Order Successfull','Confirmed')
    this.router.navigate(['/user/confirmorder']);
  }

}
