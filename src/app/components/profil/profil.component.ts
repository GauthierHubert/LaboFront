import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Quizz } from 'src/app/services/models/quizz';
import { User } from 'src/app/services/models/user';
import { QuizzService } from 'src/app/services/quizz/quizz.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit{

  storedUser !: User;
  quizzList !: Quizz[]
  constructor(private _authService : AuthService, private _quizzService : QuizzService){

  }

  ngOnInit(): void {
    this._authService.$auth.subscribe(
      (result) => {
        if(result)
          this.storedUser = result.user;
      }
    )

    this._quizzService.getByUser(this.storedUser.id).subscribe(
      (result) => this.quizzList = result.sort((a , b ) => b.date.valueOf() - a.date.valueOf())
    )
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
}
}
