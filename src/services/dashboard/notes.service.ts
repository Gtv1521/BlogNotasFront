
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INotes } from '../../interfaces/INotes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  // carga las libretas 
  loadBooks(id: string, cantidad: number): Observable<INotebooks> {
    return this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${id}/${cantidad}`)
  }

  loadNotes(idLibreta: string): Observable<INotes> {
    let pagina: number = 1
    return this.http.get<any>(`${this.apiUrl}/Notes/all_notes/${idLibreta}/${pagina}`);
  }
}
