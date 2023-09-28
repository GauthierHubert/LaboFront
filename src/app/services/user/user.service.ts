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
   getUsers() : Observable<Set<User>>{
    return this._http.get<Set<User>>(this.URL+ "/user/all");
   }
   deleteUser(user : User) : void {
    this._http.delete(this.URL + "/user/" + user.id);
   }
}
