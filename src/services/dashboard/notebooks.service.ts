import { Injectable } from '@angular/core';
import { environment } from '../../Environment/Environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INotebooks } from '../../interfaces/INoteBooks';

@Injectable({
  providedIn: 'root'
})
export class NotebooksService {

  // se exponen los componentes inyectados 
  private apiUrl = environment.apiUrl


  constructor(private http: HttpClient) { }

  // Muestra los datos de las libretas por pagina y usuario
  showNoteBook(pagina: Int16Array, idUser: string): Observable<INotebooks> {
    return this.http.get<any>(`${this.apiUrl}/Libreta/view_books/${idUser}/${pagina}`).pipe(
      map((response) => {
        return {
          IdLibreta: response.idLibreta,
          Nombre: response.Nombre,
          IdUser: response.idUser
        }
      })
    );
  }

  
}
