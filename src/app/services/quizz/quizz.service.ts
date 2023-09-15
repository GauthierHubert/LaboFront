import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  private $quizz !: Observable<Quizz>;

  constructor(private _http : HttpClient, private _authService : AuthService) {
    this._authService.$auth.subscribe({
      next : (result : TokenDTO | undefined) =>{
        if(result){
          this.storedUser = result.user;
        }
      }
    })
   }


  createQuizz(difficulty : Difficulty) : Observable<Quizz>{
      console.log(difficulty.id);
      const quizzForm : quizzForm = {
        difficultyId : difficulty.id,
        userId : this.storedUser.id
      }
      this.$quizz = this._http.post<Quizz>(this.URL+ "/quizz", quizzForm);
      console.log(this.$quizz);
      return this.$quizz;
  }
}
