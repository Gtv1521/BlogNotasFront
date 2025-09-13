import { Observable } from "rxjs";
import { NoteEntity } from "../../domain/models/note.model";
import { NoteDto } from "../dtos/notes.dto";

export class notesMapper {
    fromDto(dto: NoteDto): NoteEntity{
        return {
            idNote: dto.idNote,
            idLibreta: dto.idLibreta,
            idUser: dto.idUser,
            title: dto.title,
            contenido: dto.contenido,
            fechaUpdate: dto.fechaUpdate,
            fechaCreacion: dto.fechaCreacion
        }
    }

    toDto(dto: NoteEntity): NoteDto {
        return {
            idNote: dto.idNote ?? "",
            idLibreta: dto.idLibreta,
            idUser: dto.idUser,
            title: dto.title,
            contenido: dto.contenido,
            fechaUpdate: dto.fechaUpdate ? new Date(dto.fechaUpdate) : new Date(),
            fechaCreacion: dto.fechaCreacion ? new Date(dto.fechaCreacion) : new Date()

        }
    }
}