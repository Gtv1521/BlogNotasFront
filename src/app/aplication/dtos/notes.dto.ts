export interface NoteDto {
  readonly idNote: string;
  title: string;
  contenido: string;
  idUser: string;
  idLibreta: string | null;
  fechaCreacion: Date;
  fechaUpdate: Date;
}
