
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INotes } from '../../interfaces/INotes';
import { AuthService } from '../utils/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = environment.apiUrl
  private userId: string | null = null

  private http = inject(HttpClient)
  private auth = inject(AuthService)
  // carga las libretas 
  loadBooks(cantidad: number): Observable<INotebooks> {
    this.userId = this.auth.getUserId()
    return this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${this.userId}/${cantidad}`)
  }

  // carga los datos 
  loadNotes(idLibreta: string): Observable<INotes> {
    let pagina: number = 1
    return this.http.get<any>(`${this.apiUrl}/Notes/all_notes/${idLibreta}/${pagina}`);
  }
}
