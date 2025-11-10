import { userDto } from "@app/aplication/dtos/user.dto"
import { NoteEntity } from "./note.model"
import { User } from "./user.model"

export interface ReferenceEntity {
    id: string,
    idUser: string,
    idNote: string,
    idLibreta: string,
    idReference: string,
    leer: boolean,
    editar: boolean
}


export interface ReferenceWithNoteEntity extends ReferenceEntity {
    noteDetails: NoteEntity,
    userDetails: userDto
}