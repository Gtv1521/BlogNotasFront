import { map, Observable } from "rxjs";
import { BookEntity } from "../../domain/models/noteBooks.model";
import { IBook } from "../../domain/ports/crud.port";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { envDev, environment } from "../../../Environment/Environment";
import { BookDto } from "../../aplication/dtos/libreta.dto";
import { bookMapper } from "../../aplication/mappers/book,map";

@Injectable({ providedIn: 'root' })
export class booksHttpAdapter implements IBook<BookEntity> {
    private Url = `${environment.apiUrl}/Libreta`
    private prueba = `${envDev.prueba}/Libreta`
    constructor(
        private http: HttpClient,
        private maper: bookMapper
    ) { }

    // Trae todas las libretas de un usuario en el numero de la pagina 
    readAll(idUser: string, page: number): Observable<BookEntity[]> {
        return this.http.get<BookDto[]>(`${this.Url}/view_books/${idUser}/${page}`).pipe(
            map((res: BookDto[]) => res.map(dto => this.maper.fromDto(dto)))
        );
    }

    // agrega una libreta nueva
    write(data: BookEntity): Observable<string> {
        const dato = {
            nameBook: data.nameBook,
            idAuthor: data.idUser
        }  

        return this.http.post<string>(`${this.Url}/create_book`, dato, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    //  actualiza nombre e una libreta  
    update(data: BookEntity): Observable<boolean> {
        const update = new FormData();
        update.append('idLibreta', data.id);
        update.append('name', data.nameBook)
        return this.http.patch<boolean>(`${this.Url}/update_name/${data.id}`, update);
    }

    // elimina una libreta  
    delete(id: string): Observable<boolean> {
        return this.http.delete<boolean>(`${this.Url}/remove_book/${id}`);
    }
}