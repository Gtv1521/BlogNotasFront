export class NoteEntity {
    constructor(
        public idNote: string | null,
        public title: string,
        public contenido: string,
        public idUser: string,
        public idLibreta: string,
        public fechaCreacion: Date | null,
        public fechaUpdate: Date | null
    ) { }
}