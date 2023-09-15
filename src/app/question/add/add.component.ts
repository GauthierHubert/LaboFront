import { Component, OnInit} from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/services/models/type';
import { QuestionService } from 'src/app/services/question/question.service';
import { TypeService } from 'src/app/services/type/type.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  questionForm : FormGroup
  types !: Set<Type>;

  constructor(private _fb : FormBuilder, private _questionServce : QuestionService, private _typeService : TypeService){


    this.questionForm = this._fb.group({
      title : [null, [Validators.required]],
      explication : [null, [Validators.required]],
      type : [null, [Validators.required]],
      answers : this._fb.array([
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup(),
        this.createAnswerFormGroup()
      ])
    })
  }

  ngOnInit(): void {
      this._typeService.$types.subscribe({
        next : (result : Set<Type>) => {
          this.types = result
          console.log(this.types);

        }
      })
  }

  get answers() : FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  createAnswerFormGroup(): FormGroup {
    return this._fb.group({
      title: [null, [Validators.required]],
      valid: [false]
    });
  }



  addQuestion() : void {
    console.log(this.questionForm.value);

    if(this.questionForm.valid){
      console.log("test valid");

      this._questionServce.addQuestion(this.questionForm.value).subscribe();
    }
  }



}
