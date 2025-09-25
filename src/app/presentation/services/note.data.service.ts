import { Injectable } from "@angular/core";
import { SafeResourceUrl } from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
export class NoteDataService {
    private data!: initNota;

    setNote(data: initNota){
        this.data = data;
    }

    getNote(){
        return this.data;
    }

    clearNote(){
        this.data.idLibreta = '';
        this.data.idNota = '';
    }
}


export class initNota {
    constructor(
        public idNota: string|null,
        public idLibreta: string
    ){}
}