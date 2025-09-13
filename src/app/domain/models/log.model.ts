export class logEntity {
    constructor(
        public mail: string,
        public password: string
    ) { }
}

export class singEntity {
    constructor(
        public name: string,
        public mail: string,
        public password: string,
        public role: string
    ) { }
}