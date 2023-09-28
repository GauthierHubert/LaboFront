import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TokenDTO } from '../auth/token';
import { Difficulty } from '../models/difficulty';
import { Quizz } from '../models/quizz';
import { quizzForm } from '../models/quizzForm';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class QuizzService{

  readonly URL : string = "http://localhost:8080"
  private storedUser !: User;
  private _data$ : BehaviorSubject<Quizz | undefined> = new BehaviorSubject<Quizz | undefined>(undefined)

  constructor(private _http : HttpClient, private _authService : AuthService) {
    this._authService.$auth.subscribe({
      next : (result : TokenDTO | undefined) =>{
        if(result){
          this.storedUser = result.user;
        }
      }
    })
   }

   get data$(): Observable<Quizz | undefined> {
    return this._data$.asObservable();
  }

  get data(): Quizz | undefined {
    return this._data$.value;
  }

  start(token: Quizz): void {
    sessionStorage.setItem("quizz", JSON.stringify(token));
    console.log("test start");
    
    this._data$.next(token);
  }

  clear(quizz : Quizz): void {
    console.log("QUIZZ CLEARED");
    
    this.quizzFinished(quizz)
    sessionStorage.removeItem("quizz");
    sessionStorage.removeItem("index")
    this._data$.next(undefined);
  }


  createQuizz(difficulty : Difficulty) : Observable<Quizz>{
      const quizzForm : quizzForm = {
        difficultyId : difficulty.id,
        userId : this.storedUser.id
      }
      return this._http.post<Quizz>(this.URL+ "/quizz", quizzForm);
  }

  getByUser(id : number) : Observable<Quizz[]> {
    return this._http.get<Quizz[]>(this.URL+`/quizz/all/${id}`);
  }

  quizzFinished(quizz : Quizz) : void {
    this._http.put(this.URL + "/quizz/update", quizz);
  }
}
