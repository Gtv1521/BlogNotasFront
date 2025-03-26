
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INotes } from '../../interfaces/INotes';
import { AuthService } from '../utils/Auth/auth.service';
import { CacheService } from '../utils/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = environment.apiUrl
  private userId: string | null = null

  private http = inject(HttpClient)
  private auth = inject(AuthService)
  private cache = inject(CacheService)
  // carga las libretas 
  loadBooks(cantidad: number): Observable<INotebooks> {
    this.userId = this.auth.getUserId()
    const request = this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${this.userId}/${cantidad}`)
    return this.cache.get('libretas', request);
  }

  // carga los datos 
  loadNotes(idLibreta: string): Observable<INotes> {
    let pagina: number = 1
    const cacheKey = `notes_${idLibreta}`
    const request = this.http.get<INotes>(`${this.apiUrl}/Notes/all_notes/${idLibreta}/${pagina}`);
    return this.cache.get(cacheKey, request); 
  }
}
