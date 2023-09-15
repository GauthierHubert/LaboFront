import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../login/login.component';
import { MessageService } from 'primeng/api';
import {Message} from 'primeng//api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenDTO } from 'src/app/services/auth/token';
import { User } from 'src/app/services/models/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  ref: DynamicDialogRef | undefined;
  storedUser ?: User;

  constructor(private dialogService: DialogService, public messageService: MessageService, private _authService : AuthService){
  }

  ngOnInit(){
    this._authService.$auth.subscribe({
      next : (result : TokenDTO | undefined) =>{
        if(result){
          this.storedUser = result.user;
        }
      }
    }
      )
  }

  logout(){
    this.storedUser = undefined;
    this._authService.logout();
    location.reload();
  }

  show() {
    this.ref = this.dialogService.open(LoginComponent, {
      header: 'Connection',
      width: '30%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000
    });
  }
}
