import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quizz } from '../services/models/quizz';
import { QuizzService } from '../services/quizz/quizz.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit{

   quizz !: Observable<Quizz>

  constructor(private _quizzService : QuizzService){

  }


   ngOnInit(): void {

    this.quizz = this._quizzService.$quizz
  }

}
