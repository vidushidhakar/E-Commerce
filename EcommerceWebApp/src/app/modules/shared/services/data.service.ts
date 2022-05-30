import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private db: AngularFirestore) {}

  getUsers() {
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.users)
        .valueChanges({ idField: 'id' })
        .subscribe((users) => resolve(users));
    });
  }

  deleteUser(user: string) {
    this.db.doc(`${AppConstants.users}/${user}`).delete();
  }

  getCategories() {
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.categories)
        .valueChanges({ idField: 'id' })
        .subscribe((categories) => resolve(categories));
    });
  }

  addCategory(category: string) {
    this.db.collection(AppConstants.categories).doc(category).set({});
  }

  deleteCategory(category: string) {
    this.db.doc(`${AppConstants.categories}/${category}`).delete();
  }

  getSubcategories(category: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection(`${AppConstants.categories}/${category}/${AppConstants.subcategories}`)
        .valueChanges({ idField: 'id' })
        .subscribe((subcategories) => resolve(subcategories));
    });
  }

  addSubCategory(subcategory: string, category: string) {
    this.db
      .collection(`${AppConstants.categories}/${category}/${AppConstants.subcategories}`)
      .doc(subcategory)
      .set({});
  }

  deleteSubCategory(subcategory: string, category: string) {
    this.db.doc(`${AppConstants.categories}/${category}/${AppConstants.subcategories}/${subcategory}`).delete();
  }

  getProducts(subcategory: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.products, (ref) =>
          ref.where('subcategory', '==', subcategory)
        )
        .valueChanges({ idField: 'id' })
        .subscribe((products) => resolve(products));
    });
  }

  getAllProducts() {
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.products)
        .valueChanges({ idField: 'id' })
        .subscribe((products) => resolve(products));
    });
  }

  addProduct(product: any, id: string) {
    this.db.collection(AppConstants.products).doc(id).set({
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      img: product.img,
    });
  }

  deleteProduct(product: string) {
    this.db.doc(`${AppConstants.products}/${product}`).delete();
  }

  getSingleProduct(productId: string) {
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.products)
        .doc(productId)
        .valueChanges({ idField: 'id' })
        .subscribe((product) => resolve(product));
    });
  }

  searchProduct(itemToBeSearched:string){
    
    return new Promise<any>((resolve) => {
      this.db
        .collection(AppConstants.products
          , (ref) =>
          // ref.orderBy("name").startAt(itemToBeSearched).endAt(itemToBeSearched)
           ref.orderBy("name").startAt(itemToBeSearched).endAt(itemToBeSearched+ "\uf8ff")
           //ref.where('subcategory', '==', itemToBeSearched)
           
        )
        .valueChanges({ idField: 'id' })
        .subscribe((products) =>
        {
          // console.log(products)
         resolve(products)});
    });
  }

}
