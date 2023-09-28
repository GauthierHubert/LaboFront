import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SlideMenuModule} from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';

import { MultiSelectModule } from 'primeng/multiselect';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';

const PRIME_NG_EXPORTS = [
  PasswordModule,
  ButtonModule,
  DynamicDialogModule,
  InputTextModule,
  SlideMenuModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  MultiSelectModule,
  PaginatorModule,
  TableModule
]

@NgModule({
  declarations: [],
  imports: [],
  exports : [
    ...PRIME_NG_EXPORTS
  ],
  providers : [
    DialogService,
    MessageService
  ]
})
export class SharedModule { }
