import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../domain/models/user.model";
import { map, Observable } from "rxjs";
import IUser from "../../domain/ports/crud.port";
import { environment } from "../../../Environment/Environment";
import { userDto } from "../../aplication/dtos/user.dto";

@Injectable({ providedIn: 'root' })

export class UserHttpAdapter implements IUser<User> {
    private Url = environment.apiUrl + '/Usuario'

    constructor(
        private http: HttpClient
    ) { }

    // lee un usuario 
    read(id: string | null): Observable<User> {
        return this.http.get<User>(`${this.Url}/user/${id}`);
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