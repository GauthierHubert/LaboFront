export interface User {
  id : number,
  username : string,
  email : string,
  rank : number,
  role : UserRole
}

export enum UserRole{
  Admin,
  User
}
