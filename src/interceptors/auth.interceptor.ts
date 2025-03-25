// src/app/interceptors/auth.interceptor.ts
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/utils/Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth = inject(AuthService)


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clona la petición y añade el token de autenticación
    const authReq = this.addTokenToRequest(req);
    
    // Envía la petición modificada
    return next.handle(authReq).pipe(
      // Manejo global de errores
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la petición:', error);
        return throwError(() => error);
      })
    );
  }


  private addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    // Obtén el token de localStorage
    const token = this.auth.getToken()
    
    // Si existe el token, clona la petición y añade el header
    if (token) {
      return req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    
    return req;
  }
}