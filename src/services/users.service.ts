import { inject, Injectable } from '@angular/core'
import { environment } from '../Environment/Environment'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { IResponseLogin, ISignin, IUserlogin } from '../interfaces/IUser'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // datos externos
  private apiUrl = environment.apiUrl

  // inicializaciones del constructor
  private _http = inject(HttpClient)

  // Cambia la contraseña cuando el usuario la olvida
  resetPassword(email: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/Session/reset_password/${email}`)
  }

  // Inicia session de usuario
  login(user: IUserlogin): Observable<IResponseLogin> {
    // se hace parametrizacion de los datos (multiform/form-data)
    const formData = new FormData()
    formData.append('Email', user.Email)
    formData.append('Password', user.Password)

    // se hace consulta y se retorna salida
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
    const formData = new FormData() // Parametrizacion (multipart/form-data)
    formData.append('Email', user.Email)
    formData.append('Name', user.Name)
    formData.append('Password', user.Password)
    formData.append('Role', user.Role)

    // Consulta y se retorna la salida de los datos 
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

  requestUser(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/Usuario/user/${id}`)
  }
}
