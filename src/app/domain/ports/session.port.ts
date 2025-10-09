import { Observable, ObservedValueOf } from "rxjs";

export interface ISession<InputOne, InputTwo, Exit> {
     logIn(data: InputOne): Observable<Exit> // entra data log / sale datos log
     logOut(): Observable<string> // cierra session
     sigIn(data: InputTwo): Observable<Exit> // entra user / sale datos log
     resetPass(mail: string): Observable<boolean> // envia mail de recuperacion {pass}
     verifyMail(mail: string): Observable<boolean> // verifica mail
}