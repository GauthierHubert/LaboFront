import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  first2: number = 0;
  rows2: number = 10;
  userList !: User[];
  size !: number;
  constructor(private _userService : UserService){

  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      (result) => {this.userList = Array.from(result.values())
        this.userList.sort((a, b) => b.rank - a.rank);
        this.size = this.userList.length;

        console.log(this.userList);
      }
      )

      
      
  }

  onPageChange2(event: any) {
    
  }

}
