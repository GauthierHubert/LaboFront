import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL : string = "http://localhost:8080"

  constructor(private _http : HttpClient) {



   }

   addUser(user : User) : Observable<User> {
    return this._http.post<User>(this.URL+ "/user", user)
   }
}
