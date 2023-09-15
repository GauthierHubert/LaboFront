import { User } from "../models/user";

export interface TokenDTO{
  token ?: string,
  user : User;
}
