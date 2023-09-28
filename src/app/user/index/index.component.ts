import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{

  listUser !: Set<User>

  constructor(private _userService : UserService){

  }
  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      (result) => this.listUser = result
    )
  }

  

  deleteUser(user : User){
   this._userService.deleteUser(user);
  }
}
