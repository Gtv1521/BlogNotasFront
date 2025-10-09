import { Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INewNote } from '../../interfaces/INotes';
import { CacheService } from '../../app/infrastructure/cache/cache.service';
import { AuthService } from '../utils/Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotebooksService {

  // se exponen los componentes inyectados 
  private apiUrl = environment.apiUrl
  private userId: string | null = ''
  constructor(
    private http: HttpClient,
    private cache: CacheService,
    private auth: AuthService
  ) {
    this.userId = this.auth.getUserId()
  }

  // Muestra los datos de las libretas por pagina y usuario
  showNoteBook(pagina: number): Observable<INotebooks> {

    console.log(this.userId)
    const cacheKey = `libretas_${this.userId}`;
    const request = this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${this.userId}/${pagina}`);
   console.log(request);
    return this.cache.get(cacheKey, request);
  }

  // crea una nueva libreta
  createNoteBook(data: INewNote): Observable<INewNote> {
    return this.http.post<any>(`${this.apiUrl}/Libreta/create_book`, data)
  }
}
