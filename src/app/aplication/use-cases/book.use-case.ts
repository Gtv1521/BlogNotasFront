import { Inject, Injectable } from "@angular/core";
import { BOOK_TOKEN } from "../../infrastructure/tokens/books.tokens";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { BookEntity } from "../../domain/models/noteBooks.model";
import { bookInput } from "../inputs/book.input";
import { IBook } from "../../domain/ports/crud.port";

@Injectable({ providedIn: 'root' })
export class BookUseCase {


    private datosSubject = new BehaviorSubject<BookEntity[]>([]);
    book$ = this.datosSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    private errorSubject = new BehaviorSubject<any>([]);
    errors$ = this.errorSubject.asObservable();


    constructor(
        @Inject(BOOK_TOKEN) private book: IBook<BookEntity>,
    ) { }

    // lee las libretas de un usuario
    loadAll(id: string, page: number): void {
        this.loadingSubject.next(true);
        this.datosSubject.next([]);
        this.book.readAll(id, page).pipe(
            tap(() => this.loadingSubject.next(false)),
            catchError((err) => {
                throw new Error(err.error.message)
            })
        ).subscribe(res => this.datosSubject.next(res));
    }

    // cuenta el numero de notas en la libreta
    count(id: string): Observable<number>{
        return this.book.count(id).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    } 

    // crea una nueva libreta
    insert(input: bookInput): Observable<string> {

        // cambia el tipado de input a entity
        const insertar: BookEntity = {
            id: '',
            nameBook: input.name,
            idUser: input.idUser,
            notesCount: 0
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
            nameBook: input.name,
            notesCount: 0
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

    //  termina session
    logout(): void {
        //  se limpian las cosultas 
        this.datosSubject.next([]);
        this.loadingSubject.next(false);
        this.errorSubject.next([]);
    }
}