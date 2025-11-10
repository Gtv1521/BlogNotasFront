import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareDto, shareFilterDto } from '@app/aplication/dtos/share.dto';
import {
  ReferenceEntity,
  ReferenceWithNoteEntity,
} from '@app/domain/models/reference.model';
import { IReference } from '@app/domain/ports/crud.port';
import { map, Observable } from 'rxjs';
import { environment } from '@environments/environments';
import { MapperShare } from '@app/aplication/mappers/share.map';

@Injectable({ providedIn: 'root' })
export class ShareNoteAdapter
  implements IReference<ReferenceEntity, ReferenceWithNoteEntity>
{
  constructor(private http: HttpClient, private mapper: MapperShare) {}
  count(id: string): Observable<number> {
    throw new Error('Method not implemented.');
  }

  private Url = `${environment.apiUrl}/ShareNote`;

  //  lee un recurso compartido por el id
  read(id: string | null): Observable<ReferenceEntity> {
    return this.http
      .get<ShareDto>(`${this.Url}/${id}`)
      .pipe(map((res: ShareDto) => this.mapper.fromDto(res)));
  }

  //  trae todos los recursos compartidos de un usuario en el numero de la pagina
  readAll(id: string, page: number): Observable<ReferenceWithNoteEntity[]> {
    return this.http.get<shareFilterDto[]>(`${this.Url}/${id}/${page}`).pipe(
      map((res: shareFilterDto[]) => {
        return res.map((dto) => this.mapper.fromDtoShareFilter(dto));
      })
    );
  }

  // filtra los recursos compartidos por un criterio de búsqueda y el id del usuario
  filter(filter: string, id: string): Observable<ReferenceWithNoteEntity[]> {
    return this.http
      .get<shareFilterDto[]>(`${this.Url}/filter/${id}`, {})
      .pipe(
        map((res: shareFilterDto[]) =>
          res.map((dto) => this.mapper.fromDtoShareFilter(dto))
        )
      );
  }

  // crea un nuevo recurso compartido
  write(data: ReferenceEntity): Observable<string> {
    const insert = {
      idUser: data.idUser,
      idNote: data.idNote,
      idReferido: data.idReference,
      readPermits: data.leer,
      writePermits: data.editar,
    };

    return this.http.post<string>(`${this.Url}`, insert, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // actualiza permisos de un recurso compartido
  update(data: ReferenceEntity): Observable<boolean> {
    return this.http.put<boolean>(`${this.Url}/${data.id}`, data);
  }

  // elimina un recurso compartido
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.Url}/${id}`);
  }
}
