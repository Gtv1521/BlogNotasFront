import { Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';
import { INewNote } from '../../interfaces/INotes';
import { CacheService } from '../utils/cache/cache.service';

@Injectable({
  providedIn: 'root'
})
export class NotebooksService {

  // se exponen los componentes inyectados 
  private apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient,
    private cache: CacheService
  ) { }

  // Muestra los datos de las libretas por pagina y usuario
  showNoteBook(pagina: number, idUser: string): Observable<INotebooks> {
    const cacheKey = `libretas_${idUser}_${pagina}`;
    const request = this.http.get<INotebooks>(`${this.apiUrl}/Libreta/view_books/${idUser}/${pagina}`);
    return this.cache.get(cacheKey, request);
  }

  // crea una nueva libreta
  createNoteBook(data: INewNote): Observable<INewNote>{ 
    return this.http.post<any>(`${this.apiUrl}/Libreta/create_book`, data)
  }
}
