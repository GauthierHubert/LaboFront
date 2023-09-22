import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfilComponent } from './components/profil/profil.component';


import { SharedModule } from './utils/shared/shared.module';

import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddComponent } from './question/add/add.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    NotfoundComponent,
    AddComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
