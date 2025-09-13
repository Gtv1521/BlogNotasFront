export class sessionDto {
    constructor(
        public idUser: string,
        public name: string,
        public email: string,
        public message: string,
        public token: string
    ){}
}