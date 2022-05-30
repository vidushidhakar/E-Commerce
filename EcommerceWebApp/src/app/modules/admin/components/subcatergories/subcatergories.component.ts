import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-subcatergories',
  templateUrl: './subcatergories.component.html',
  styleUrls: ['./subcatergories.component.css'],
})

export class SubcatergoriesComponent implements OnInit {

  categoriesList: any;
  subcategoriesList: any[] = [];
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSubCategories();
  }

  async getSubCategories() {
    this.subcategoriesList = [];
    this.categoriesList = await this.dataService.getCategories();
    for (let category of this.categoriesList) {
      let subcategories = await this.dataService.getSubcategories(
        category.id
      );
      for (let subcategory of subcategories) {
        this.subcategoriesList.push({
          name: subcategory.id,
          id: category.id,
        });
      }
    }
  }

  addSubCategory(subcategory: HTMLInputElement, category: HTMLSelectElement) {
    this.dataService.addSubCategory(subcategory.value, category.value);
    subcategory.value = '';
    this.getSubCategories();
  }

  deleteSubCategory(subcategory: string, category: string) {
    this.dataService.deleteSubCategory(subcategory, category);
    this.getSubCategories();
  }
}
