import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesList:any[]=[]

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }
  
  async getAllCategories(){
    this.categoriesList=await this.dataService.getCategories()
  }

  addCategory(category:HTMLInputElement){
    this.dataService.addCategory(category.value)
    this.getAllCategories()
    category.value=''
  }

  deleteCategory(category:string){
    this.dataService.deleteCategory(category)
    this.getAllCategories()
  }
}
