import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string | null = null;
  private tokenUser: string | null = null;

  constructor(){
    this.tokenUser = localStorage.getItem('token');
    this.userId = localStorage.getItem('id');
  }

  // inicia los datos de session 
  setAuth(id: string, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id );
    this.userId = id
    this.tokenUser = token
  }

  // obtiene el id de usuario que ya esta en la session
  getUserId(): string | null {
    return this.userId 
  }

  // lleva el token de usuario a otra funcion 
  getToken(): string | null {
    return this.tokenUser
  } 

// Limpia y destruye la session 
  clearUserId(): void {
    this.userId = null;
    this.tokenUser = null
  }
}
