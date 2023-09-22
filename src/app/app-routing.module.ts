import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AddComponent } from './question/add/add.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'quizz/:id', component : QuizzComponent},
  { path : 'profil', component : ProfilComponent},
  { path : 'question', loadChildren: () => import('./question/question.module').then (m => m.QuestionModule)},
  { path : 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},

  { path : '404notfound', component : NotfoundComponent },
  // ! A mettre en dernier
  //Signifie " toutes les autres routes qui ne sont pas celles spécifiées au dessus" (en prenant compte les routes enfants)
  { path : '**', redirectTo : '404notfound' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
