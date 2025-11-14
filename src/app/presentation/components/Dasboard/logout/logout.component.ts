import { Component, inject } from '@angular/core';
import { LoaderSpinnerComponent } from '../../loader/loader-spinner/loader-spinner.component';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { NotesUseCase } from '../../../../aplication/use-cases/notes.use-case';
import { Router } from '@angular/router';
import { SessionUseCase } from '../../../../aplication/use-cases/session.use-case';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { ListBooksComponent } from '../../list-books/list-books.component';
import { NotificationHubService } from '@app/infrastructure/hubs/notifications-hub.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoaderSpinnerComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
})
export class LogoutComponent {
  // servicios del constructor
  private route = inject(Router); // paso a rutas
  private books = inject(BookUseCase); // paso a libretas
  private notes = inject(NotesUseCase); // paso a notas
  private session = inject(SessionUseCase); // paso a session
  private auth = inject(AuthService); // paso a session
  private notify = inject(NotificationHubService)

  ngOnInit(): void {
    // limpia las consultas antes de salir
    this.session.logout().subscribe({
      next: (res) => console.warn('sesion cerrada'),
      error: (err) => console.warn(err),
    }); // orden de cerrar session
    
    setTimeout(() => {
      this.notify.stopConnection(); // cierra conexion con signalR
      this.notes.logout(); // limpia las notas
      this.auth.clearUser(); // borra el id de navegador
      this.books.logout(); // limpia los libros
      this.route.navigate(['/']); // vuelve al inicio
    }, 2000);
  }
}
