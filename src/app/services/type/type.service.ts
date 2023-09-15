import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  readonly URL : string = "http://localhost:8080"
  constructor(private _http : HttpClient) {}

  get $types() : Observable<Set<Type>>{
   return this._http.get<Set<Type>>(this.URL + "/type/all")
  }
}
