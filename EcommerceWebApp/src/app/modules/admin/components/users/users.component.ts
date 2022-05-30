import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  async getAllUsers(){
    this.users=await this.dataService.getUsers()
   
  }

  deleteUser(user:string){
    this.dataService.deleteUser(user)
    this.getAllUsers()
  }
}
