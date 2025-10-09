// src/app/interceptors/auth.interceptor.ts
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { environment } from '../Environment/Environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private Url = `${environment.apiUrl}/Session`;
  isRefreshing: boolean = false; // habilita refresh

  private http = inject(HttpClient); // conexion con backend
  private route = inject(Router); // Rutas de la app
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Clona la petición y añade el token de autenticación
    const authReq = req.clone({ withCredentials: true });

    // Envía la petición modificada
    return next.handle(authReq).pipe(
      // Manejo global de errores
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          console.warn('🔄 Token expirado, intentando refrescar...');

          return this.http.get(`${this.Url}/refresh`, { withCredentials: true }).pipe(
            switchMap(() => {
              this.isRefreshing = false;
              const retryReq = req.clone({ withCredentials: true })
              return next.handle(retryReq);
            }),
            catchError(refreshError => {
              this.isRefreshing = false;
              console.error('❌ Error al refrescar el token', refreshError);
              this.route.navigate(["/logout"]); // cierra session 
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}