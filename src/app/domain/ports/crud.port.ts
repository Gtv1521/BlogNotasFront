import { Observable } from "rxjs"

export interface ICrud<Model> {
    read(id: string | null): Observable<Model> // marca los datos asincronos de un usuario
    readAll(page: number): Observable<Model[]>  // marca lista de usuarios (asincrono)
    filter(filter: string): Observable<Model[]>
    write(data: Model): Observable<string>
    update(data: Model): Observable<boolean>
    delete(id: string): Observable<boolean>
}

// interface para el inicio de session
export default interface IUser<Model> extends Omit<ICrud<Model>, 'readAll' | 'write' | 'filter'> { }

//  interface para las notas 
export interface INote<Model> extends Omit<ICrud<Model>, 'readAll' | 'filter'> {
    readAllById(id: string, page: number): Observable<Model[]>
    filter(id: string, filter: string): Observable<Model[]>
}

export interface IBook<Model> extends Omit<ICrud<Model>, 'readAll' | 'filter' | 'read'> { 
    readAll(idUser: string, page: number): Observable<Model[]>
    count(id:string): Observable<number>
}