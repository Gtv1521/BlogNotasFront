import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId: string | null = null;

  constructor(){
    this.userId = localStorage.getItem('id');
  }

  // inicia los datos de session 
  setAuth(id: string): void {
    localStorage.setItem('id', id );
    this.userId = id;
  }

  // obtiene el id de usuario que ya esta en la session
  getUserId(): string | null {
    return this.userId 
  }

// Limpia y destruye la session 
  clearUserId(): void {
    this.userId = null;
    localStorage.removeItem('id')
    localStorage.removeItem('token')
  }
}
