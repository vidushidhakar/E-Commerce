import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { Product } from 'src/app/modules/shared/models/product';
import { NotificationService } from 'src/app/shared/shared-data/notification.service';
import { DataService } from '../../../shared/services/data.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})

export class ProductsComponent implements OnInit {
  
  categoriesList: any;
  subcategoriesList: any[] = [];
  productList: Product[] = [];
  edit: boolean = false;
  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  downloadURL!: Observable<any>;

  constructor(
    private dataService: DataService,
    private angularFireStorage: AngularFireStorage,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  async getAllProducts() {
    this.productList = await this.dataService.getAllProducts();
  }

  async getCategories() {
    this.categoriesList = await this.dataService.getCategories();
  }

  async getSubcategories(category: string) {
    this.subcategoriesList = await this.dataService.getSubcategories(category);
  }

  addProduct(product: any) {
    if (this.edit) {
      this.dataService.addProduct(product.value, product.value.id);
      this.notifyService.showSuccess('Product Successfully Updated', 'Updated');
      this.getAllProducts();
      product.resetForm();
    } else {
      this.downloadURL.subscribe((res) => {
        product.value.img = res;
        //console.log(product)
        this.dataService.addProduct(product.value, product.value.productno);
        this.getAllProducts();
        this.notifyService.showSuccess('Product Successfully Added', 'Added');
        product.resetForm();
      });
    }
  }

  deleteProduct(product: string) {
    this.dataService.deleteProduct(product);
    this.getAllProducts();
  }

  upload = (event: any) => {
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.angularFireStorage.ref('/Products/' + randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
      .subscribe();
  };

  async editProduct(id: string, form: any) {
    let product = await this.dataService.getSingleProduct(id);
    this.edit = true;
    form.patchValue({
      category: product.category,
    });
  }

}
