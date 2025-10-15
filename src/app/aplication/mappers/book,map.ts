import { BookEntity } from "../../domain/models/noteBooks.model";
import { BookDto } from "../dtos/libreta.dto";

export class bookMapper {
    fromDto(dto: BookDto): BookEntity{
        return {
            id: dto.idLibreta,
            idUser: dto.idUser,
            nameBook: dto.nombre,
            notesCount: dto.notesCount,
            updateDate: dto.updateBook,
            createDate: dto.createBook
        }
    } 

    toDto(dto: BookEntity): BookDto {
        return {
            idLibreta: dto.id,
            idUser: dto.idUser,
            nombre: dto.nameBook,
            notesCount: dto.notesCount,
            createBook: dto.createDate,
            updateBook: dto.updateDate,
        }
    }
}