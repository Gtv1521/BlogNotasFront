import { Inject, Injectable, ResourceStatus } from "@angular/core";
import { INote } from "../../domain/ports/crud.port";
import { NOTES_TOKEN } from "../../infrastructure/tokens/notes.token";
import { NoteEntity } from "../../domain/models/note.model";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { noteInput } from "../inputs/note,input";

@Injectable({ providedIn: 'root' })

export class NotesUseCase {

    private datosSubject = new BehaviorSubject<NoteEntity[]>([]);
    notas$ = this.datosSubject.asObservable();

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();

    private errorSubject = new BehaviorSubject<any>([]);
    errors$ = this.errorSubject.asObservable();

    constructor(
        @Inject(NOTES_TOKEN) private notes: INote<NoteEntity>
    ) { }

    count(id: string): Observable<number> {
        return this.notes.count(id);
    }

    // Carga una sola nota 
    load(id: string): Observable<NoteEntity> {
        return this.notes.read(id).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    }

    // carga todas las notas dee una libreta 
    allNotesByBook(idBook: string, page: number): void {
        this.loadingSubject.next(true);
        this.datosSubject.next([]); // se pone en vacio para cargar elementos
        this.notes.readAllById(idBook, page).pipe(
            tap(() => this.loadingSubject.next(false)),
            catchError((err) => {
                this.errorSubject.next(err);
                this.loadingSubject.next(false);
                return of([])
            })
        ).subscribe(res => {
            this.datosSubject.next(res);
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
            catchError((err) => {
                throw new Error(err.error.message)
            })
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
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    }

    deleteNote(id: string): Observable<string> {
        return this.notes.delete(id);
    }

    // cierra session
    logout(): void {
        // se limpian las consultas 
        this.datosSubject.next([]);
        this.loadingSubject.next(false);
        this.errorSubject.next([]);
    }
}