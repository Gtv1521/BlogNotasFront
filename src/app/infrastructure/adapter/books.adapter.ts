import { map, Observable } from 'rxjs';
import { BookEntity } from '../../domain/models/noteBooks.model';
import { IBook } from '../../domain/ports/crud.port';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environments';
import { BookDto } from '../../aplication/dtos/libreta.dto';
import { bookMapper } from '../../aplication/mappers/book,map';

@Injectable({ providedIn: 'root' })
export class booksHttpAdapter implements IBook<BookEntity> {
  private Url = `${environment.apiUrl}/Libreta`;

  constructor(private http: HttpClient, private maper: bookMapper) {}

  // Filtra las libretas por un criterio de búsqueda y el id del usuario
  filter(filter: string, id: string): Observable<BookEntity[]> {
    return this.http
      .get<BookDto[]>(`${this.Url}/filter/${id}`, {
        params: { filter, id },
      })
      .pipe(map((res: BookDto[]) => res.map((dto) => this.maper.fromDto(dto))));
  }

  // lee una libreta por el id
  read(id: string | null): Observable<BookEntity> {
    return this.http
      .get<BookDto>(`${this.Url}/view_book/${id}`)
      .pipe(map((res: any) => this.maper.fromDto(res)));
  }

  // cuenta el numero de notas por libreta
  count(id: string): Observable<number> {
    return this.http.get<number>(`${this.Url}/books_count/${id}`);
  }

  // Trae todas las libretas de un usuario en el numero de la pagina
  readAll(idUser: string, page: number): Observable<BookEntity[]> {
    return this.http
      .get<BookDto[]>(`${this.Url}/view_books/${idUser}/${page}`)
      .pipe(map((res: BookDto[]) => res.map((dto) => this.maper.fromDto(dto))));
  }

  // agrega una libreta nueva
  write(data: BookEntity): Observable<string> {
    const dato = {
      nameBook: data.nameBook,
      idAuthor: data.idUser,
    };

    return this.http.post<string>(`${this.Url}/create_book`, dato, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  //  actualiza nombre e una libreta
  update(data: BookEntity): Observable<boolean> {
    const params = { idLibreta: data.id, name: data.nameBook };
    return this.http.patch<boolean>(
      `${this.Url}/update_name/${data.id}`,
      null,
      { params }
    );
  }

  // elimina una libreta
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.Url}/remove_book/${id}`);
  }
}
