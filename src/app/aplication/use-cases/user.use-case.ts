import { Inject, Injectable } from "@angular/core";
import IUser from "../../domain/ports/crud.port";
import { User } from "../../domain/models/user.model";
import { USER_CRUD_TOKEN } from "../../infrastructure/tokens/crud.tokens";
import { catchError, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class UserUseCase {

    // se hace uso del http adapter
    constructor(
        @Inject(USER_CRUD_TOKEN) private user: IUser<User>
    ) { }

    // lee un usuario
    findById(id: string | null): Observable<User> {
        return this.user.read(id).pipe(
            catchError(err => {
                throw new Error('Error al obtener usuarios', err);
            })
        );
    }

    // update user
    updateUser(data: User): Observable<boolean> {
        return this.user.update(data).pipe(
            catchError(err => {
                throw new Error('Error al actualizar usuario', err);
            })
        );
    }

    // delete user
    deleteUser(id: string): Observable<boolean> {
        return this.user.delete(id).pipe(
            catchError(err => {
                throw new Error('Error no se puede borrar el usuario', err);
            })
        );
    }
}