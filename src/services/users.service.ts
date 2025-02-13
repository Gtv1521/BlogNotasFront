import { Injectable } from '@angular/core'
import { environment } from '../Environment/Environment'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IResponseLogin, IUserlogin } from '../interfaces/IUser'

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
    return this._http.post<any>(`${this.apiUrl}/Session/log_in`, formData)
  }

  // Hace registro de un nuevo usuario 
}
