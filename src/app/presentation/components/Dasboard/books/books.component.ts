import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TargetComponent } from "../../utils/target/target.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faGears, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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
  menuActive: boolean = false;
  selectItem: string | null = null;
  id: string = '';
  quantity: number = 0; // cantidad de libretas
  pagina: number = 1; // pagina actual
  deleteBook: boolean = false; // activa panel para borrar 
  edit: boolean = false; // activa edicion 
  blockPage: boolean = true; // desactiva el paginado
  alert: boolean = false; // activa alerta de delete

  // icons
  faTrash = faTrash; // delete
  faPenToSquare = faPenToSquare// editar 
  faChevronLeft = faChevronLeft // regresar
  fachevronRight = faChevronRight // avanzar
  faPlus = faPlus // agregar
  faChevronUp = faChevronUp; // flecha arriba
  faChevronDown = faChevronDown; // flecha abajo

  private service = inject(BookUseCase); // enlace a books
  private auth = inject(AuthService); // enlace a auth
  private router = inject(Router); // enlace a rutas

  books$ = this.service.book$; // data
  loading$ = this.service.loading$; // loader
  error$ = this.service.errors$; // errores

  // se lanza al unicio de componente
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

  // cambia el estado de deleteBook
  onDelete(): void {
    this.deleteBook = !this.deleteBook;
    this.blockPage = !this.blockPage;

  }

  // cambia el estado de edit
  onEdit(): void {
    this.alert = true; // activa mensaje
    this.blockPage = !this.blockPage;
    this.edit = !this.edit;
  }

  // activa componente en uso 
  onNoteSelected(id: string): void {
    if (this.edit) {
      this.edit = false;
      this.blockPage = false;
      this.router.navigate([`/book/${id}`]);
    } else {
      if (this.selectItem !== id) {
        this.selectItem = this.selectItem === id ? null : id;
        this.getLibreta.emit(id)
      }
    }
  }

  // cambia de pagina
  changePage(page: number): void {
    if (page >= 1 && page <= this.quantity) {
      this.pagina = page;
      this.service.loadAll(this.id, page);
    }
  }

  // oculta o muestra el menu inferior
  toggleMenu(option: boolean): void {
    this.menuActive = !option;
  }

  // nueva libreta
  goNewBook(): void {
    this.router.navigate(['/new_book'])
  }
}