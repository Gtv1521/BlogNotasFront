import { InjectionToken } from "@angular/core";
import { INote } from "../../domain/ports/crud.port";
import { NoteEntity } from "../../domain/models/note.model";

export const NOTES_TOKEN = new InjectionToken<INote<NoteEntity>>('NOTES_TOKEN');