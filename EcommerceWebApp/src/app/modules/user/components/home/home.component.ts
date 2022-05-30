import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  slider=[{
    image:"./assets/images/slider/slider-1.jpg",
    url:"/user/products/Fashion/Mens"
  },
  {
    image:"./assets/images/slider/slider-2.jpg",
    url:"/user/products/Fashion/Womens"
  },
  {
    image:"./assets/images/slider/slider-3.jpg",
    url:"/user/products/Beauty/Makeup"
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
