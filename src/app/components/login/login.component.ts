import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DialogService, MessageService]
})
export class LoginComponent {

  loginForm !: FormGroup;
  registerForm !: FormGroup;
  isRegister : boolean = true;
  constructor(
    private _loginService : AuthService,
    private _fb : FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ){
    this.loginForm = this._fb.group({
      username : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })

    this.registerForm = this._fb.group({
      username : [null, [Validators.required]],
      email : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  login(){
    if(this.loginForm.valid){
    this._loginService.login(this.loginForm.value)
      .subscribe({
        next: (data) => this.ref.close(),
        error: console.error
      });

  }
    else{
      console.log(this.loginForm.value);
    }
  }

  register(){
    if(this.registerForm.valid){
    this._loginService.register(this.registerForm.value)
      .subscribe({
        next: (data) => this.ref.close(),
        error: console.error
      });

  }
    else{
      console.log(this.registerForm.value);
    }
  }

  changePage(){
    this.isRegister = !this.isRegister;
  }
}
