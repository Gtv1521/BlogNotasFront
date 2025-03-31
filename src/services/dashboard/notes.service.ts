
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INewNote, INotes } from '../../interfaces/INotes';
import { AuthService } from '../utils/Auth/auth.service';
import { CacheService } from '../utils/cache/cache.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrl = environment.apiUrl
  private userId: string | null = null

  private datosSubject = new BehaviorSubject<any[]>([]);
  notes$ = this.datosSubject.asObservable();

  private http = inject(HttpClient)
  private auth = inject(AuthService)
  private cache = inject(CacheService)
  // carga las libretas 
  // loadBooks(cantidad: number): Observable<INotebooks> {
  //   this.userId = this.auth.getUserId()
  //   const request = this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${this.userId}/${cantidad}`)
  //   return this.cache.get('libretas', request);
  // }

  // carga todas las notas de una libreta
  // Cargar las notas para una libreta
  loadNotes(idLibreta: string): void {
    const pagina = 1
    this.http.get<any[]>(`${this.apiUrl}/Notes/all_notes/${idLibreta}/${pagina}`).pipe(
      tap(datos => this.datosSubject.next(datos)) // Actualiza el Subject
    ).subscribe();
  }

  // carga los datos de una nota 
  loadOneNote(id: string): Observable<INotes> {
    const cacheKey = `note_${id}`;
    this.cache.clear(cacheKey);
    const request = this.http.get<INotes>(`${this.apiUrl}/Notes/one_note/${id}`);
    return this.cache.get(cacheKey, request);
  }

  // crear nueva nota
  createdNote(data: INewNote): Observable<any> {
    const id = this.auth.getUserId();
    const formData = new FormData();

    if (id !== null) {
      formData.append('IdUser', id);
    }

    formData.append('IdLibreta', data.idLibreta);
    formData.append('Contenido', data.contenido);
    formData.append('Title', data.title);

    return this.http.post<any>(`${this.apiUrl}/Notes/new_nota`, formData).pipe(
      tap(() => this.loadNotes(data.idLibreta)) // Recarga los datos después de agregar
    );;
  }


  // actualizar nota creada
  updateNote(id: string, data: any): Observable<any> {
    const request = this.http.patch<any>(`${this.apiUrl}/Notes/update_note/${id}`, data)
    this.cache.clear(`note_${id}`)
    return request
  }
}
