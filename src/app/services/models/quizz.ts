import { User } from "./user";
import { Difficulty } from "./difficulty";
import { SmallQuestion } from "./smallquestion";

export interface Quizz {

  id : number;
  date : Date;
  goodAnswer : number;
  questionList : Array<SmallQuestion>;
  userAnswers : Set<String>;
  difficulty : Difficulty ;
  user : User;


}


