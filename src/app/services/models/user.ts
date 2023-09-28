export interface User {
  id : number,
  username : string,
  email : string,
  rank : number,
  roles : UserRole[]
}

export enum UserRole{
  Admin = "Admin",
  User = "User"
}
