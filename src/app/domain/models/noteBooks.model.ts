export class BookEntity {
    constructor(
        public id: string,
        public nameBook: string,
        public idUser: string,
        public notesCount: number
    ){}
}