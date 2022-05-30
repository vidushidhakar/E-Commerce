import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { PermissionService } from '../../permission/permission.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categoriesList!: any;
  subcategoriesList!: any[];
  role : string =''
  constructor(private dataService: DataService, private permissionService:PermissionService) {}

  ngOnInit(): void {
    this.getSubCategories();
    this.role=this.permissionService.hasPermission()
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
