import { Inject, Injectable } from "@angular/core";
import { BOOK_TOKEN } from "../../infrastructure/tokens/books.tokens";
import { catchError, Observable } from "rxjs";
import { BookEntity } from "../../domain/models/noteBooks.model";
import { bookInput } from "../inputs/book.input";
import { IBook } from "../../domain/ports/crud.port";

@Injectable({ providedIn: 'root' })
export class BookUseCase {

    constructor(
        @Inject(BOOK_TOKEN) private book: IBook<BookEntity>,
    ) { }

    // lee las libretas de un usuario
    loadAll(id: string, page: number): Observable<BookEntity[]> {
        return this.book.readAll(id, page).pipe(
            catchError((err) => {
                throw new Error(err.error.message)
            })
        );
    }

    insert(input: bookInput): Observable<string> {

        console.log(input)
        // cambia el tipado de input a entity
        const insertar: BookEntity = {
            id: '',
            nameBook: input.name,
            idUser: input.idUser
        }

        // pasa la libreta nueva al adapter
        return this.book.write(insertar).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );

    }

    // actualiza el nombre de una libreta
    update(input: bookInput, id: string): Observable<boolean> {
        // cambia el tipado de input a entity
        const updateBook: BookEntity = {
            id: id,
            idUser: input.idUser,
            nameBook: input.name
        }

        // actualiza datos en el adapter
        return this.book.update(updateBook).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    }

    // elimina una libreta con todas las notas que contiene 
    delete(id: string): Observable<boolean> {
        return this.book.delete(id).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    }
}