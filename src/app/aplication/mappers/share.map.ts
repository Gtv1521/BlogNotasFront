import {
  ReferenceEntity,
  ReferenceWithNoteEntity,
} from '@app/domain/models/reference.model';
import { ShareDto, shareFilterDto } from '../dtos/share.dto';
import { inject } from '@angular/core';
import { UserMapper } from './user.map';
import { notesMapper } from './notes.map';

export class MapperShare {
  private userMapper = inject(UserMapper);
  private noteMapper = inject(notesMapper);

  fromDto(dto: ShareDto): ReferenceEntity {
    return {
      id: dto.id,
      idNote: dto.noteId,
      idUser: dto.idUser,
      idLibreta: dto.idLibreta,
      idReference: dto.idUserReference,
      leer: dto.readPermits,
      editar: dto.writePermits,
    };
  }

  fromDtoShareFilter(dto: shareFilterDto): ReferenceWithNoteEntity {
    return {
      id: dto.id,
      idNote: dto.noteId,
      idUser: dto.idUser,
      idLibreta: dto.idLibreta,
      idReference: dto.idUserReference,
      leer: dto.readPermits,
      editar: dto.writePermits,
      noteDetails: this.noteMapper.fromDto(dto.noteDetails[0]),
      userDetails: this.userMapper.aDto(dto.userDetails[0]),
    };
  }

  toDto(entity: ReferenceEntity): ShareDto {
    return {
      id: entity.id,
      noteId: entity.idNote,
      idUser: entity.idUser,
      idLibreta: entity.idLibreta,
      idUserReference: entity.idReference,
      writePermits: entity.editar,
      readPermits: entity.leer,
    };
  }
}
