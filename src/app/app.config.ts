import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { ICrud } from './domain/ports/crud.port';
import { UserHttpAdapter } from './infrastructure/adapter/user-http.adapter';
import { User } from './domain/models/user.model';
import { USER_CRUD_TOKEN } from './infrastructure/tokens/crud.tokens';
import { SessionHttpAdapter } from './infrastructure/adapter/session-http.adapter';
import { SESSION_TOKEN } from './infrastructure/tokens/session.token';
import { sessionMapper } from './aplication/mappers/session,map';
import { notesMapper } from './aplication/mappers/notes.map';
import { bookMapper } from './aplication/mappers/book,map';
import { BOOK_TOKEN } from './infrastructure/tokens/books.tokens';
import { booksHttpAdapter } from './infrastructure/adapter/books.adapter';
import { NOTES_TOKEN } from './infrastructure/tokens/notes.token';
import { notesHttpAdapter } from './infrastructure/adapter/notes-http.adapter';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideHttpClient(withInterceptorsFromDi()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
      {
        provide: SESSION_TOKEN,
        useClass: SessionHttpAdapter
      },
      {
        provide: USER_CRUD_TOKEN,
        useClass: UserHttpAdapter
      },
      {
        provide: BOOK_TOKEN,
        useClass: booksHttpAdapter
      },
      {
        provide: NOTES_TOKEN,
        useClass: notesHttpAdapter
      },
      provideRouter(routes),
      sessionMapper,
      notesMapper,
      bookMapper,
    ]
};
