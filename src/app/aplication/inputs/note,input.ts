export class noteInput{
    constructor(
        public idBook: string,
        public idUser: string,
        public title: string | null,
        public content: string | null
    ){}
}