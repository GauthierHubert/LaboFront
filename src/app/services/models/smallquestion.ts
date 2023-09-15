import { Answer } from "./answer";

export interface SmallQuestion{

  title : String;
  answers : Set<Answer> ;
}
