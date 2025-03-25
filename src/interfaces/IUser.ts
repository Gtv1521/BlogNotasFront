export interface IUser extends IUserlogin {
  Id: number
  Name: string
}

export interface IUserlogin {
  Email: string
  Password: string
}

export interface IResponseLogin {
  id: string
  name: string
  email: string
  message: string
  token: string
}

export interface ISignin extends IUserlogin {
  Name: string
  Role: string
}
