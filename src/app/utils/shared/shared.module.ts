import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SlideMenuModule} from 'primeng/slidemenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


const PRIME_NG_EXPORTS = [
  PasswordModule,
  ButtonModule,
  DynamicDialogModule,
  InputTextModule,
  SlideMenuModule,
  DropdownModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports : [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ...PRIME_NG_EXPORTS
  ],
  providers : [
    DialogService,
    MessageService
  ]
})
export class SharedModule { }
