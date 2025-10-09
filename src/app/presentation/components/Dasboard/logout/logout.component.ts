import { Component, inject } from '@angular/core';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { NotesUseCase } from '../../../../aplication/use-cases/notes.use-case';
import { Router } from '@angular/router';
import { SessionUseCase } from '../../../../aplication/use-cases/session.use-case';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoaderSpinnerComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  // servicios del constructor
  private  route = inject(Router); // paso a rutas 
  private books = inject(BookUseCase); // paso a libretas
  private notes = inject(NotesUseCase); // paso a notas
  private session = inject(SessionUseCase); // paso a session

  ngOnInit(): void {
    // limpia las consultas antes de salir 
    this.notes.logout(); // limpia las notas
    this.books.logout(); // limpia los libros
    this.session.logout(); // orden de cerrar session
    
    setTimeout(() => {
      this.route.navigate([""]) // vuelve al inicio
    }, 2000);
  }
}
