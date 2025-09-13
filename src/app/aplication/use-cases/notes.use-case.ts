import { Inject, Injectable, ResourceStatus } from "@angular/core";
import { INote } from "../../domain/ports/crud.port";
import { NOTES_TOKEN } from "../../infrastructure/tokens/notes.token";
import { NoteEntity } from "../../domain/models/note.model";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { noteInput } from "../inputs/note,input";
import { NoteDataComponent } from "../../presentation/components/Dasboard/note-data/note-data.component";

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

    load(id: string): Observable<NoteEntity> {
        return this.notes.read(id).pipe(
            catchError((err) => {
                throw new Error(err.error.message);
            })
        );
    }

    allNotesByBook(idBook: string): void {
        this.loadingSubject.next(true);
        this.notes.readAllById(idBook, 1).pipe(
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
}