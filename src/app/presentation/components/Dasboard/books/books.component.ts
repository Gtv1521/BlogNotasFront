import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TargetComponent } from "../../utils/target/target.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [TargetComponent, LoaderSpinnerComponent, AsyncPipe, FontAwesomeModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  // datos de componente padre
  @Output() getLibreta = new EventEmitter<string>();

  // estados
  modal: boolean = false;

  isActive: boolean = false
  selectItem: string | null = null
  id: string = ''
  quantity: number = 0 // cantidad de libretas
  pagina: number = 1 // pagina actual

  // icons
  faTrash = faTrash; // delete
  faPenToSquare = faPenToSquare// editar 
  faChevronLeft = faChevronLeft // regresar
  fachevronRight = faChevronRight // avanzar

  private service = inject(BookUseCase)
  private auth = inject(AuthService)

  books$ = this.service.book$;
  loading$ = this.service.loading$;
  error$ = this.service.errors$;

  ngOnInit(): any {
    this.id = `${this.auth.getUserId()}`;
    this.loadNoteBooks();
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {

    // consulta de todas las libretas
    this.service.loadAll(this.id, this.pagina);
    this.service.count(this.id).subscribe({
      next: (count) => {
        this.quantity = Math.ceil(count / 10); // redondea hacia arriba
      },
      error: (err) => {
        console.error('Error al obtener el conteo de libretas:', err);
      }
    });

    // se invoca la primera nota 
    this.service.book$.subscribe((books) => {
      if (books && books.length > 0) {
        const firstBookId = books[0].id;
        this.getLibreta.emit(firstBookId);
        this.onNoteSelected(firstBookId);
      }
    });
  }

  // activa componente en uso 
  onNoteSelected(id: string): void {
    if (this.selectItem !== id) {
      this.selectItem = this.selectItem === id ? null : id;
      this.getLibreta.emit(id)
    }
  }

  // cambia de pagina
  changePage(page: number): void {
    if (page >= 1 && page <= this.quantity) {
      this.pagina = page;
      this.service.loadAll(this.id, this.pagina);
    }
  }
}