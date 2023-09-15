import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TokenDTO } from '../auth/token';
import { QuestionForm } from '../models/questionForm';
import { Quizz } from '../models/quizz';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  readonly URL : string = "http://localhost:8080"
  private storedUser !: User;
  private $question !: Observable<Quizz>;
  constructor(private _http : HttpClient, private _authService : AuthService) {
    this._authService.$auth.subscribe({
      next : (result : TokenDTO | undefined) =>{
        if(result){
          this.storedUser = result.user;
        }
      }
    })
   }

   addQuestion(form : QuestionForm) : Observable<Quizz>{
    form.creator = this.storedUser;
    console.log("test service");

    this.$question = this._http.post<Quizz>(this.URL + "/question", form);
    console.log(this.$question);
    return this.$question;
   }

   deleteQuestion(id : number) {
    this._http.delete(this.URL+ `/${id}`)
   }

}
