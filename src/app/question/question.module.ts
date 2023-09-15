import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../utils/shared/shared.module';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class QuestionModule { }
