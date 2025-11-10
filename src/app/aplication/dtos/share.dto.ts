import { User } from "@app/domain/models/user.model";
import { NoteDto } from "./notes.dto";

export interface ShareDto {
  id: string;
  idUser: string;
  noteId: string;
  idLibreta: string;
  idUserReference: string;
  writePermits: boolean;
  readPermits: boolean
}

export interface shareFilterDto extends ShareDto {
  noteDetails: NoteDto[], 
  userDetails: User[]
} 