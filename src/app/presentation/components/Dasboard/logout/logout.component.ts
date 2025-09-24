import { Component, inject } from '@angular/core';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { NotesUseCase } from '../../../../aplication/use-cases/notes.use-case';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoaderSpinnerComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  // servicios del constructor
  private books = inject(BookUseCase);
  private notes = inject(NotesUseCase);

  ngOnInit(): void {
    // limpia las consultas antes de salir 
    this.books.logout();
    this.notes.logout();
  }
}
