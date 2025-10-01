export class NoteDto {
    constructor(
        public idNote: string,
        public title: string,
        public contenido: string,
        public idUser: string,
        public idLibreta: string |null,
        public fechaCreacion: Date,
        public fechaUpdate: Date
    ) { }
}