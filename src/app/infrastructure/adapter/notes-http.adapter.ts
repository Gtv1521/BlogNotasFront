import { map, Observable } from 'rxjs';
import { NoteEntity } from '../../domain/models/note.model';
import { INote } from '../../domain/ports/crud.port';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { notesMapper } from '@app/aplication/mappers/notes.map';
import { NoteDto } from '@app/aplication/dtos/notes.dto';

@Injectable({ providedIn: 'root' })
export class notesHttpAdapter implements INote<NoteEntity> {
  private Url = `${environment.apiUrl}/Notes`;

  constructor(private http: HttpClient,
    private mapper: notesMapper
  ) {}

  // Cambia la libreta de una nota
  changeBook(idNote: string, idLibreta: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.Url}/change_book/${idNote}`, null, {
      params: {
        idNote: idNote,
        idLibreta: idLibreta,
      },
    });
  }

  // cuenta la cantidad de notas por libreta
  count(id: string): Observable<number> {
    return this.http.get<number>(`${this.Url}/count_notes/${id}`);
  }

  // lee toadas la notas por el id de la libreta
  readAllById(id: string, page: number): Observable<NoteEntity[]> {
    return this.http.get<NoteDto[]>(`${this.Url}/all_notes/${id}/${page}`).pipe(
      map((res: NoteDto[]) => res.map((dto) => this.mapper.fromDto(dto)))
    );
  }

  // lee una nota
  read(id: string | null): Observable<NoteEntity> {
    return this.http.get<NoteEntity>(`${this.Url}/one_note/${id}`);
  }

  //  hace filtro para buscar en todas la notas del usuario
  filter(filter: string, id: string): Observable<NoteEntity[]> {
    throw new Error('Method not implemented.');
  }

  // Agrega una nota nueva a la base de datos
  write(data: NoteEntity): Observable<string> {
    const formData = new FormData();

    formData.append('Title', data.title);
    formData.append('Contenido', data.contenido);
    formData.append('IdUser', data.idUser);
    formData.append('IdLibreta', `${data.idLibreta}`);

    return this.http.post<string>(`${this.Url}/new_nota`, formData);
  }

  // actualiza una nota
  update(data: NoteEntity): Observable<boolean> {
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('IdUser', data.idUser);
    formData.append('Contenido', data.contenido);
    formData.append('IdLibreta', `${data.idLibreta}`);

    return this.http.patch<boolean>(
      `${this.Url}/update_note/${data.idNote}`,
      formData
    );
  }

  // elimina una nota de la base de datos
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.Url}/remove_note/${id}`);
  }
}
