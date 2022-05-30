import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AppConstants {
    public static currentUser = "currentUser"
    public static categories = "Categories";
    public static subcategories = "subcategories";
    public static users = "Users";
    public static products = "Products";
    public static cart = "Cart";
    public static productsCollection = "products";
    public static orders = "Orders";
    public static wishlist = "Wishlist";
    public static token = "token"
    public static expirationDate = "expirationDate"
    public static role = "role"
}