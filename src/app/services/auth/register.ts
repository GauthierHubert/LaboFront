import { UserRole } from "../models/user"

export interface Register{
  username : String,
  email : String,
  password : String
  role : UserRole
}
