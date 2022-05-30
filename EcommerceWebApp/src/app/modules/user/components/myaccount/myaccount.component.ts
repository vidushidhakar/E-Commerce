import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { OrdersService } from '../../../shared/services/orders.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css'],
})
export class MyaccountComponent implements OnInit {

  orderList: any[] = [];
  currentUser = localStorage.getItem(AppConstants.currentUser);
  totalPrice: number = 0;
  
  constructor(
    private ordersService: OrdersService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.orderDetails();
  }

  async orderDetails() {
    let orders = await this.ordersService.getOrder();

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
