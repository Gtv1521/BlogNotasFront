import { Inject, inject, Injectable } from '@angular/core';
import {
  ReferenceEntity,
  ReferenceWithNoteEntity,
} from '@app/domain/models/reference.model';
import { IReference } from '@app/domain/ports/crud.port';
import { REFERENCE_TOKEN } from '@app/infrastructure/tokens/reference.token';
import { catchError, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShareUseCase {
  constructor(
    @Inject(REFERENCE_TOKEN)
    private share: IReference<ReferenceEntity, ReferenceWithNoteEntity>
  ) {}

  //  obtiene compartido por id
  loaad(id: string): Observable<ReferenceEntity> {
    return this.share.read(id).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  //  trae todos los referidos de una nota 
  loadAll(id: string, page: number): Observable<ReferenceWithNoteEntity[]> {
    return this.share.readAll(id, page).pipe(
      catchError((err) => {
        throw new Error(err);
      })
    );
  }

  // filtra los recursos compartidos por un criterio de búsqueda y el id del usuario
  filter(filter: string, id: string): Observable<ReferenceWithNoteEntity[]> {
    return this.share.filter(id, filter).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  // crea un nuevo recurso compartido
  create(data: ReferenceEntity): Observable<string> {
    return this.share.write(data).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  // actualiza permisos de un recurso compartido
  update(data: ReferenceEntity): Observable<boolean> {
    return this.share.update(data).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }

  // remove un recurso compartido
  remove(id: string): Observable<string> {
    return this.share.delete(id).pipe(
      catchError((err) => {
        throw new Error(err.error.message);
      })
    );
  }
}
