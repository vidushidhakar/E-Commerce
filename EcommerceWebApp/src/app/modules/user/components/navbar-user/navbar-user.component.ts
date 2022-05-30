import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/shared/services/data.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css'],
})
export class NavbarUserComponent implements OnInit {
  categoriesList!: any;
  subcategoriesList!: any[];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSubCategories();
  }

  async getSubCategories() {
    this.subcategoriesList = [];
    this.categoriesList = await this.dataService.getCategories();
    for (let category of this.categoriesList) {
      let subcategories = await this.dataService.getSubcategories(category.id);
      for (let subcategory of subcategories) {
        this.subcategoriesList.push({ name: subcategory.id, id: category.id });
      }
    }
  }
}
