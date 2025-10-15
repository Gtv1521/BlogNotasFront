export class BookDto {
    constructor(
        public idLibreta: string,
        public nombre: string,
        public idUser: string,
        public notesCount: number,
        public createBook: Date | null,
        public updateBook: Date | null,
    ) {}
}