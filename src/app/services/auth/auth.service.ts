import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Login } from './login';
import { TokenDTO } from './token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_KEY = 'token';
  readonly URL : string = "http://localhost:8080"
  private _authTokenSubject : BehaviorSubject<TokenDTO | undefined>
  = new BehaviorSubject<TokenDTO | undefined>(undefined)

  constructor(private _http: HttpClient) {

  }

   login(login: Login): Observable<TokenDTO> {
    return this._http.post<TokenDTO>(this.URL + "/login" , login).pipe(
      tap((token: TokenDTO) =>{
        this._authTokenSubject.next(token);
        sessionStorage.setItem(this.AUTH_KEY, JSON.stringify(token));
      } )
    );
  }

  logout() : void {
      this._authTokenSubject = new BehaviorSubject<TokenDTO | undefined>(undefined)
      sessionStorage.removeItem(this.AUTH_KEY);
  }

  get auth() : TokenDTO | undefined {
    const authString = sessionStorage.getItem(this.AUTH_KEY);
    if( authString ){
      const auth = JSON.parse( authString )
      return auth;
    }
    else {
      return undefined
    }
  }

  get $auth() : Observable<TokenDTO | undefined>{
    return this._authTokenSubject.asObservable();
  }

  get token() {
    return this.auth?.token
  }

  get isConnected() {
    return !!this.auth
  }
}
