import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from 'src/app/services/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{

  userForm !: FormGroup;
  roles : UserRole[] = new Array();
  constructor(
    private _userService : UserService,
    private _fb : FormBuilder,
  ){
    this.userForm = this._fb.group({
      username : [null, [Validators.required]],
      email : [null, [Validators.required]],
      password : [null, [Validators.required]],
      roles : this._fb.array([], [Validators.required])
    })
  }

  ngOnInit(): void {
    this.roles.push(UserRole.User);
    this.roles.push(UserRole.Admin);
}

  addUser(){
    if(this.userForm.valid){
    this._userService.addUser(this.userForm.value).subscribe(

    )
  }
    else{
      console.log(this.userForm.value);
    }
  }
}


