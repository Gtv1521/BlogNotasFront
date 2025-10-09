import { Observable } from "rxjs";
import { ISession } from "../../domain/ports/session.port";
import { environment } from "../../../Environment/Environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { sessionDto } from "../../aplication/dtos/session.dto";
import { logEntity, singEntity } from "../../domain/models/log.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SessionHttpAdapter implements ISession<logEntity, singEntity, sessionDto> {

    private Url = `${environment.apiUrl}/Session`

    constructor(
        private http: HttpClient
    ) { }

    // inicia session con el usuario
    logIn(data: logEntity): Observable<sessionDto> {
        const formData = new FormData();

        // Agregar cada campo al FormData
        formData.append('Email', data.mail);
        formData.append('Password', data.password);

        return this.http.post<sessionDto>(`${this.Url}/log_in`, formData);
    }

    logOut(): Observable<string> {
        return this.http.get<string>(`${this.Url}/log_out`);
    }

    // agrega nuevo usuario
    sigIn(data: singEntity): Observable<sessionDto> {
        const formData = new FormData();

        formData.append('Email', data.mail);
        formData.append('Name', data.name);
        formData.append('Password', data.password);
        formData.append('Role', data.role);

        return this.http.post<sessionDto>(`${this.Url}/sign_in`, formData);
    }

    // se envia email con token para cambiar pass
    resetPass(mail: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.Url}/reset_password/${mail}`);
    }

    // verica que email exista
    verifyMail(mail: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.Url}/check_mail/${mail}`);
    }
}