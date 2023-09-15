import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfilComponent } from './components/profil/profil.component';
import { QuestionComponent } from './question/question.component';
import { QuizzComponent } from './quizz/quizz.component';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'quizz', component : QuizzComponent, loadChildren : () => import("./quizz/quizz.module").then((m) => m.QuizzModule)},
  { path : 'question', component : QuestionComponent, loadChildren : () =>import("./question/question.module").then((m) => m.QuestionModule)},
  { path : 'profil', component : ProfilComponent},

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
