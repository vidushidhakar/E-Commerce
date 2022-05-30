import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { OrdersService } from 'src/app/modules/shared/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {

  orderList: any[] = [];
  currentUser = localStorage.getItem('currentUser');
  totalPrice: number = 0;

  constructor(
    private ordersService: OrdersService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.orderDetails();
  }

  async getUserDetails() {}

  async orderDetails() {
    let orders = await this.ordersService.getAllOrders();
    for (let orderdetails of orders) {
      let orderedProductList = [];
      this.totalPrice = 0;
      for (let product of orderdetails.order) {
        let productDetails = await this.dataService.getSingleProduct(
          product.id
        );
        productDetails.qty = product.qty;
        orderedProductList.push(productDetails);
      }
      this.totalProductsPrice(orderedProductList);
      this.orderList.push({
        id: orderdetails.id,
        user: orderdetails.user,
        address: [orderdetails.address],
        products: [orderedProductList],
        total: this.totalPrice,
      });
    }
  }

  totalProductsPrice(productList: any) {
    for (let product of productList) {
      this.totalPrice += product.qty * product.price;
    }
  }
  
}
