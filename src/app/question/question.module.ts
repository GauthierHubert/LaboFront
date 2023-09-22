import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { SharedModule } from '../utils/shared/shared.module';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    SharedModule
  ]
})
export class QuestionModule { }
