import { Inject, Injectable } from "@angular/core";
import { BOOK_TOKEN } from "../../infrastructure/tokens/books.tokens";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { BookEntity } from "../../domain/models/noteBooks.model";
import { bookInput } from "../inputs/book.input";
import { IBook } from "../../domain/ports/crud.port";
import { CacheStoreService } from "../../infrastructure/cache/cache.service";

@Injectable({ providedIn: 'root' })
export class BookUseCase {

    private keyCache = 'DataBooks';
    private datosSubject = new BehaviorSubject<BookEntity[]>([]);
    book$ = this.datosSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    private errorSubject = new BehaviorSubject<any>([]);
    errors$ = this.errorSubject.asObservable();


    constructor(
        @Inject(BOOK_TOKEN) private book: IBook<BookEntity>,
        private cache: CacheStoreService,
    ) {
        const data = this.cache.get<BookEntity[]>(this.keyCache);
        if (data) {
            this.datosSubject.next(data);
        }
    }

    // lee una libreta 
    load(id: string | null): Observable<BookEntity> {
        return this.book.read(id).pipe(
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    // lee las libretas de un usuario
    loadAll(id: string, page: number): void {
        this.loadingSubject.next(true); // activa loader
        this.datosSubject.next([]); // inicia datos en vacio

        this.book.readAll(id, page).subscribe({
            next: res => {
                this.datosSubject.next(res); // obtien los datos
                this.cache.set(this.keyCache, res) // se guarda en cache
                this.loadingSubject.next(false); // apaga loader 
            },
            error: err => {
                this.errorSubject.next(err); // se pasa el error si existe
                this.loadingSubject.next(false); // se apaga el loader 
            }
        });
    }

    // cuenta el numero de notas en la libreta
    count(id: string): Observable<number> {
        return this.book.count(id).pipe(
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    // crea una nueva libreta
    insert(input: bookInput): Observable<string> {

        // cambia el tipado de input a entity
        const insertar: BookEntity = {
            id: '',
            nameBook: input.name,
            idUser: input.idUser,
            notesCount: 0, 
            updateDate: null,
            createDate: null,
        }

        // pasa la libreta nueva al adapter
        return this.book.write(insertar).pipe(
            tap(() => {
                // ✅ Actualiza cache automáticamente
                const current = this.datosSubject.value;
                const updated = [...current, insertar];
                this.datosSubject.next(updated);
                this.cache.set(this.keyCache, updated);
            }),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );

    }

    // actualiza el nombre de una libreta
    update(input: bookInput, id: string): Observable<boolean> {
        // cambia el tipado de input a entity
        const updateBook: BookEntity = {
            id: id,
            idUser: input.idUser,
            nameBook: input.name,
            notesCount: 0,
            updateDate: null,
            createDate: null
        }

        // actualiza datos en el adapter
        return this.book.update(updateBook).pipe(
            tap(() => {
                const current = this.datosSubject.value.map(book =>
                    book.id === id ? { ...book, ...updateBook } : book
                );
                this.datosSubject.next(current);
                this.cache.set(this.keyCache, current);
            }),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    // elimina una libreta con todas las notas que contiene 
    delete(id: string): Observable<string> {
        return this.book.delete(id).pipe(
            tap(() => {
                const filtered = this.datosSubject.value.filter(b => b.id !== id);
                this.datosSubject.next(filtered);
                this.cache.set(this.keyCache, filtered);
            }),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    //  termina session
    logout(): void {
        //  se limpian las cosultas 
        this.datosSubject.next([]);
        this.loadingSubject.next(false);
        this.errorSubject.next([]);
        this.cache.remove(this.keyCache);
    }
}