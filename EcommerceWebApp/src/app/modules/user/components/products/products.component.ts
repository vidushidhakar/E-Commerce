import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { CartService } from '../../../shared/services/cart.service';
import { WishlistService } from '../../../shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  category!:string
  subcategory!:string
  products!:any[]

  constructor(private router:ActivatedRoute,private dataService:DataService,private cartService:CartService,private wishlistService:WishlistService,private notifyService:NotificationService) { 
    this.router.params.subscribe( async params => {
      this.category=params['category'] 
      this.subcategory=params['subcategory']
      this.getProductsByCategory()
    })  
  }

  ngOnInit(): void {
  }

  async getProductsByCategory(){
    this.products=[]
    this.products=await this.dataService.getProducts(this.subcategory)
  }

  // async searchItems(itemToBeSearched:string){
  //   this.products=[]
  //   this.category='search results'
  //   this.subcategory=itemToBeSearched
  //   this.item=itemToBeSearched.toLowerCase()
  //   let allProducts=await this.dataService.getAllProducts()
  //   let a= await this.dataService.searchProduct(itemToBeSearched)
  //   console.log(a)
  //   allProducts.forEach((element:any) => {
  //     if(element.name.toLowerCase().includes(this.item) || element.category.toLowerCase()==this.item || element.subcategory.toLowerCase()==this.item)
  //     this.products.push(element)
  //   });         
  // }

  async searchItems(itemToBeSearched:string){
    this.category=''
    this.subcategory=''
    this.products=[]
    this.products= await this.dataService.searchProduct(itemToBeSearched.toUpperCase())         
  }

  sortProductsBy(sortBy:string){
    switch(sortBy){
      case 'Price: Low to High':
                    this.products.sort((a,b)=>a.price>b.price?1:a.price<b.price?-1:0)
                    break;
      case 'Price: High to low':
                    this.products.sort((a,b)=>a.price>b.price?-1:a.price<b.price?1:0)
                    break;
    }
  }

  addToCart(productId:string){
    this.cartService.addProductToCart(productId);
    this.notifyService.showSuccess('Added to cart','Product Added');
  }

  addToWishlist(productId:string){
    this.wishlistService.addProductToWishlist(productId)
    this.notifyService.showSuccess('Added to Wishlist','Product Added')
  }
 
}
