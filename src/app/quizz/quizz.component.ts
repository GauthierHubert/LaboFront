import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Quizz } from '../services/models/quizz';
import { QuizzService } from '../services/quizz/quizz.service';
import { Answer } from'../services/models/answer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit, AfterViewInit{
  
  @ViewChildren('answerid') answers !: QueryList<ElementRef>;
  @ViewChild('questionid') question !: ElementRef;
  @ViewChild('loadingBar') bar !: ElementRef;
  quizz !: Quizz
  private readonly QUIZZ_KEY : string = "quizz";
  private readonly INDEX_KEY : string = "index";
  index !: string;
  indexNumber !: number;

  constructor(private _quizzService : QuizzService, private _render : Renderer2, private _router : Router){
      
  }


   ngOnInit(): void {

    const indexString = sessionStorage.getItem(this.INDEX_KEY)
    if(indexString){
      this.index = JSON.parse(indexString);
    }
    else{
      this.index = '0';
      sessionStorage.setItem(this.INDEX_KEY, this.index)
    }
    this.indexNumber = parseInt(this.index);

    const quizzString = sessionStorage.getItem(this.QUIZZ_KEY)
    console.log(quizzString);
    
    if(quizzString)
      this.quizz = JSON.parse(quizzString);
    else{}

    const url = this._router.url.split('/').reverse()
    if(!(parseInt(url[0]) == this.quizz.id)){
      sessionStorage.removeItem(this.INDEX_KEY)
      this.index = '0';
      sessionStorage.setItem(this.INDEX_KEY, this.index)

    }
    
    
  }

  ngAfterViewInit(){
    console.log(this.indexNumber);
    
    const width = (this.indexNumber*2)+ + "vw";
    this._render.setStyle(this.bar.nativeElement, 'width', width)
  }

  nextQuestion(index : string) : any{
    return new Promise((resolve) => {
      setTimeout(() =>{
        index = (parseInt(index)+1).toString();

        console.log(index);
        
        sessionStorage.removeItem("index");
        sessionStorage.setItem("index", index)

        resolve(index);
      }, 5000)
    })
  }

  validateAnswer(answer : Answer, questionIndex : number, answerIndex : number){

    if(answer.valid){      
      this.quizz.goodAnswer+=1;
      this._render.setStyle(this.answers.get(answerIndex)?.nativeElement, 'background-color', '#cdffa9')
    }else{
      this._render.setStyle(this.answers.get(answerIndex)?.nativeElement, 'background-color', '#fc6149')
      this._render.setStyle(this.answers.get(this.quizz.questionList.at(questionIndex)!.answers.findIndex(a => a.valid))?.nativeElement, 'background-color', '#cdffa9')
    }
    this._render.setStyle(this.question.nativeElement, 'transform', 'rotateY(180deg)')

    setTimeout(() => {
      this._render.setStyle(this.question.nativeElement, 'transform', 'rotateY(0)')
    }, 4000)

    this.nextQuestion(this.index).then((done: string) => {
      this.index = done;
      this.indexNumber = parseInt(done);


      
      console.log(this.quizz.goodAnswer);

      if(this.indexNumber+1 === this.quizz.questionList.length){}
        console.log("test    " + this.indexNumber + "        " + this.quizz.questionList.length);
        
      this._quizzService.clear(this.quizz);
    })

    setTimeout(() => {
      const width = (this.indexNumber*2)+2 + "vw";
      this._render.setStyle(this.bar.nativeElement, 'width', width)

    },5100)
  }
}
