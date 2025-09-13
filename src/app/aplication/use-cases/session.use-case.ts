import { catchError, map, Observable } from "rxjs";
import { ISession } from "../../domain/ports/session.port";
import { Inject, Injectable } from "@angular/core";
import { sessionMapper } from "../mappers/session,map";
import { logInput } from "../inputs/log.input";
import { logEntity, singEntity } from "../../domain/models/log.model";
import { SessionEntity } from "../../domain/models/session.model";
import { singInput } from "../inputs/sing.input";
import { sessionDto } from "../dtos/session.dto";
import { SESSION_TOKEN } from "../../infrastructure/tokens/session.token";

@Injectable({ providedIn: 'root' })

export class SessionUseCase {

    // se hace uso del http adapter
    constructor(
        @Inject(SESSION_TOKEN) private sesion: ISession<logEntity, singEntity, sessionDto>,
        public mapper: sessionMapper
    ) { }

    // Inicia session
    logIn(data: logInput): Observable<SessionEntity> {
        const mapeo = this.mapper.fromDtoLog(data); // se pasa de input a entity

        return this.sesion.logIn(mapeo).pipe(
            map((res: any) => this.mapper.toEntity(res)), // se hace cambio a la respuesta 

            catchError(err => {
                throw new Error(`${err.error.message} !!!`);
            })
        );
    }

    // Crea un usuario nuevo
    sigIn(data: singInput): Observable<SessionEntity> {
        const mapeo = this.mapper.fromDtoSing(data);

        return this.sesion.sigIn(mapeo).pipe(
            map((res: any) => this.mapper.toEntity(res)), // 
            catchError(err => {
                throw new Error(`${err.error.message} !!!`);
            })
        );
    }

    // Cambia contraseña
    resetPass(mail: string): Observable<boolean> {
        return this.sesion.resetPass(mail).pipe(
            catchError(err => {
                throw new Error(err.error.message);
            })
        );
    }

    // se verifica que el email exista en la base de datos
    verifyMail(mail: string): Observable<boolean> {
        return this.sesion.verifyMail(mail).pipe(
            catchError(err => {
                throw new Error(err.error.message);
            })
        )
    }

}