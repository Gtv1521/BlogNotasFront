import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/envirotment';

@Injectable({
  providedIn: 'root'
})

export class ConexionUrlService {
  private apiUrl = environment.apiUrl;  // Cambia a tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los datos
  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/VerUsuarios`);
  }

  // Envia los datos a la api y crea un nuevo usuario 
  postUser(userForm: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Session/SigIn`,
      {
        email: userForm.email,
        firsName: userForm.firstName,
        lastName: userForm.lastName,
        userName: userForm.userName,
        password: userForm.password,
        rol: "Administrador"
      }
    );
  }

    // Almacenar token
    setToken(token: string): void {
      localStorage.setItem('authToken', token); // Almacena el token en localStorage
    }
  
    // Obtener token
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    // Borrar token
    logout(): void {
      localStorage.removeItem('authToken');
    }
}
