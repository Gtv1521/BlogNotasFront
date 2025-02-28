import { Injectable } from '@angular/core'
import { environment } from '../Environment/Environment'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { IResponseLogin, ISignin, IUser, IUserlogin } from '../interfaces/IUser'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl

  constructor(private _http: HttpClient) {}

  // Cambia la contraseña cuando el usuario la olvida
  resetPassword(email: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/Session/reset_password/${email}`)
  }

  // Inicia session de usuario
  login(user: IUserlogin): Observable<IResponseLogin> {
    const formData = new FormData()

    formData.append('Email', user.Email)
    formData.append('Password', user.Password)
    return this._http.post<any>(`${this.apiUrl}/Session/log_in`, formData).pipe(
      map((response) => {
        return {
          id: response.idUser,
          name: response.name,
          email: response.email,
          message: response.message,
          token: response.token,
        }
      })
    )
  }

  // Hace registro de un nuevo usuario
  signin(user: ISignin): Observable<IResponseLogin> {
    const formData = new FormData()
    formData.append('Email', user.Email)
    formData.append('Name', user.Name)
    formData.append('Password', user.Password)
    formData.append('Role', user.Role)

    // Se envian los datos de consulta a api 
    return this._http.post<any>(`${this.apiUrl}/Session/sign_in`, formData).pipe(
      map((response) => {
        return {
          id: response.idUser,
          name: response.name,
          email: response.email,
          message: response.message,
          token: response.token,
        }
      })
    )
  }

  requestUser(id: string): Observable<any>{
    return this._http.get<any>(`${this.apiUrl}/Usuario/user/${id}`)
  }
}
