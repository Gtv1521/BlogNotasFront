import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../domain/models/user.model';
import { map, Observable } from 'rxjs';
import IUser from '../../domain/ports/crud.port';
import { userDto } from '../../aplication/dtos/user.dto';
import { UserMapper } from '../../aplication/mappers/user.map';
import { environment } from '@environments/environments';

@Injectable({ providedIn: 'root' })
export class UserHttpAdapter implements IUser<User> {
  private Url = environment .apiUrl + '/Usuario';

  constructor(private http: HttpClient, private maper: UserMapper) {}

  // lee un usuario
  read(id: string | null): Observable<User> {
    return this.http.get<User>(`${this.Url}/user/${id}`);
  }

  //   busca los datos de usuario por el email
  readXEmail(email: string): Observable<User[]> {
    return this.http
      .get<userDto[]>(`${this.Url}/${email}`)
      .pipe(map((res: userDto[]) => res.map((dto) => this.maper.fromDto(dto))));
  }

  // actualiza datos de usuario
  update(data: User): Observable<boolean> {
    return this.http.patch<boolean>(`${this.Url}/update_user/${data.id}`, data);
  }

  // borra un usuario
  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.Url}/delete_user/${id}`);
  }
}
