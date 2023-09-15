import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if( this._authService.isConnected ){
      const token = this._authService.token;

      const newRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
      return next.handle(newRequest)
    }
    else
      return next.handle(req)

  }
}
