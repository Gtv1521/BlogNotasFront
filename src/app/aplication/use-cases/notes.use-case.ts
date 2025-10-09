import { Inject, Injectable } from "@angular/core";
import { INote } from "../../domain/ports/crud.port";
import { NOTES_TOKEN } from "../../infrastructure/tokens/notes.token";
import { NoteEntity } from "../../domain/models/note.model";
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";
import { noteInput } from "../inputs/note,input";
import { CacheStoreService } from "../../infrastructure/cache/cache.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class NotesUseCase {

    private keyCache = 'DataNotes';
    private datosSubject = new BehaviorSubject<NoteEntity[]>([]);
    notas$ = this.datosSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    private errorSubject = new BehaviorSubject<any>([]);
    errors$ = this.errorSubject.asObservable();

    constructor(
        @Inject(NOTES_TOKEN) private notes: INote<NoteEntity>,
        private cache: CacheStoreService
    ) {
        const data = this.cache.get<NoteEntity[]>(this.keyCache);
        if (data) {
            this.datosSubject.next(data);
        }
    }

    count(id: string): Observable<number> {
        return this.notes.count(id).pipe(
            catchError(err => throwError(() => new Error(err.error.message)))
        );
    }

    // Carga una sola nota 
    load(id: string): Observable<NoteEntity> {
        return this.notes.read(id).pipe(
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    // carga todas las notas dee una libreta 
    allNotesByBook(idBook: string, page: number): void {
        this.loadingSubject.next(true);
        this.datosSubject.next([]); // se pone en vacio para cargar elementos
        this.notes.readAllById(idBook, page).subscribe({
            next: (res) => {
                this.datosSubject.next(res);
                this.cache.set(this.keyCache, res);
                this.loadingSubject.next(false); 
            },
            error: (err: HttpErrorResponse) => {
                
                if (err.status === 404) {
                    this.errorSubject.next(err)
                } else {
                    this.errorSubject.next(err);
                }
                this.loadingSubject.next(false);
                return throwError(() => err);
            }
        });
    }

    // crea una nueva nota
    createNote(data: noteInput): Observable<string> {
        const insert: NoteEntity = {
            idNote: null,
            idLibreta: data.idBook,
            idUser: data.idUser,
            title: `${data.title}`,
            contenido: `${data.content}`,
            fechaCreacion: null,
            fechaUpdate: null
        }
        return this.notes.write(insert).pipe(
            tap(() => {
                // ✅ Actualiza cache automáticamente
                const current = this.datosSubject.value;
                const updated = [...current, insert];
                this.datosSubject.next(updated);
                this.cache.set(this.keyCache, updated);
            }),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    //  actualiza contenido de una nota 
    updateNote(data: noteInput, idNote: string): Observable<boolean> {
        const updateNote: NoteEntity = {
            idNote: idNote,
            idLibreta: data.idBook,
            idUser: data.idUser,
            title: `${data.title}`,
            contenido: `${data.content}`,
            fechaCreacion: null,
            fechaUpdate: null

        }
        return this.notes.update(updateNote).pipe(
            tap(() => {
                const current = this.datosSubject.value.map(note =>
                    note.idNote === idNote ? { ...note, ...updateNote } : note
                );

                this.datosSubject.next(current);
                this.cache.set(this.keyCache, current);
            }),
            catchError((err) => throwError(() => new Error(err.error.message)))
        );
    }

    // elimina una nota por el id
    deleteNote(id: string): Observable<string> {
        return this.notes.delete(id).pipe(
            tap(() => {
                const filtered = this.datosSubject.value.filter(b => b.idNote !== id);
                this.datosSubject.next(filtered);
                this.cache.set(this.keyCache, filtered);
            }),
            catchError(err => throwError(() => new Error(err.error.message)))
        );
    }

    // cierra session
    logout(): void {
        // se limpian las consultas 
        this.datosSubject.next([]);
        this.loadingSubject.next(false);
        this.errorSubject.next([]);
        this.cache.remove(this.keyCache);
    }
}