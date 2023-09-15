import { Answer } from "./answer";
import { Type } from "./type";
import { User } from "./user";

export interface QuestionForm {
  title : String;
  explication : String;
  type : Type;
  answers : Set<Answer>;
  creator : User;
}
