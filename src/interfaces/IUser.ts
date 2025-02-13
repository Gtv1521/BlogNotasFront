export interface IUser extends IUserlogin {
  id: number
  name: string
}

export interface IUserlogin {
  Email: string
  Password: string
}

export interface IResponseLogin extends IUser {
  email: 'string'
  message: 'string'
  token: 'string'
}
