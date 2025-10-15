import { Component, EventEmitter, inject, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { TargetComponent } from "../../utils/target/target.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp, faGears, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { RequestDeleteComponent } from "../../Flotantes/request-delete/request-delete.component";
import { LoadSaveComponent } from "../../Flotantes/load-save/load-save.component";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [TargetComponent, LoaderSpinnerComponent, AsyncPipe, FontAwesomeModule, RequestDeleteComponent, LoadSaveComponent],
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
  alertConf: boolean = false; // activa el modal de confirmacion de delete
  confDelete: boolean = false; // respuesta del alert cofirma delete

  deleteActive: boolean = false; // abre el modal de carga de borrar
  loadDelete: boolean = false; // estado del espinner de carga del modal delete

  // onDelete: boolean = false;

  listDelete: string[] = [];
  // icons
  faTrash = faTrash; // delete
  faPenToSquare = faPenToSquare// editar 
  faChevronLeft = faChevronLeft // regresar
  fachevronRight = faChevronRight // avanzar
  faPlus = faPlus // agregar
  faChevronUp = faChevronUp; // flecha arriba
  faChevronDown = faChevronDown; // flecha abajo

  private book = inject(BookUseCase); // enlace a books
  private auth = inject(AuthService); // enlace a auth
  private router = inject(Router); // enlace a rutas

  books$ = this.book.book$; // data
  loading$ = this.book.loading$; // loader
  error$ = this.book.errors$; // errores

  // se lanza al unicio de componente
  ngOnInit(): any {
    this.id = `${this.auth.getUserId()}`;
    this.loadNoteBooks();
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {
    // consulta de todas las libretas
    this.book.loadAll(this.id, this.pagina);
    this.book.count(this.id).subscribe({
      next: (count) => {
        this.quantity = Math.ceil(count / 10); // redondea hacia arriba
      },
      error: (err) => {
        console.error('Error al obtener el conteo de libretas:', err);
      }
    });

    // se invoca la primera nota 
    this.book.book$.subscribe((books) => {
      if (books && books.length > 0) {
        const firstBookId = books[0].id;
        this.getLibreta.emit(firstBookId);
        this.onNoteSelected(firstBookId, false);
      }
    });
  }

  requestDelete(): void {
    if (!this.edit && !this.deleteBook) {
      this.alert = true;
      this.blockPage = false;
    } else {
      this.goDelete(false);
    }
  }
  // cambia el estado de deleteBook
  goDelete(response: boolean): void {
    if (response === false) {
      this.alert = false;  // cierra el alert
      this.deleteBook = false; // cambia el estado del boton 
      this.blockPage = true; // regresa el estado de bloquear pagina
    } else {
      this.alert = false;  // cierra el alert 
      this.deleteBook = !this.deleteBook;
      this.blockPage = false;
      this.edit = false;
      this.listDelete = []
    }
  }

  // cambia el estado de edit
  goEdit(): void {
    if (!this.deleteBook) {
      // this.alert = true; // activa mensaje
      this.edit = !this.edit;
      this.blockPage = !this.blockPage;
    }
  }

  // activa componente en uso 
  onNoteSelected(id: string, estado: boolean): void {

    let action: string = "";
    if (this.edit) action = "editar";
    if (this.deleteBook) action = "borrar";

    switch (action) {
      case "borrar":
        this.goSelectDelete(id, estado);
        break;
      case "editar":
        this.edit = false;
        this.blockPage = false;
        this.router.navigate([`/book/${id}`]);
        break;

      default:
        if (this.selectItem !== id) {
          this.selectItem = this.selectItem === id ? null : id;
          this.getLibreta.emit(id)
        }
        break;
    }
  }

  // lista de elementos a borrar
  goSelectDelete(id: string, estado: boolean): void {
    if (estado) {
      this.listDelete.push(id)
    } else {
      const index = this.listDelete.indexOf(id);
      if (index > -1) {
        this.listDelete.splice(index, 1);
      }
    }
  }

  // activa el modal de confirmacion el numero de libros a eliminar
  onDeleteConf(): void {
    this.alertConf = true; // activa modal de confDelete 
  }

  //  borra los libros seleccionados y las notas que contienen
  goDeleteBooks(response: boolean): void {
    if (response) {
      this.alertConf = false; // apaga el alert de ConfDelete
      this.deleteActive = true; // activa el delete del modal (spinner de carga)
      this.listDelete.forEach(item => {
        this.book.delete(item).subscribe({
          next: (res) => console.log(res),
        })
      })
      this.loadDelete = false;
      setTimeout(() => {
        this.loadNoteBooks();
        this.deleteActive = false;
        this.deleteBook = false; // cambia el estado del boton 
        this.blockPage = true; // regresa el estado de bloquear pagina
      }, 700);
    }
    else {
      this.alertConf = false; //apaga el modal de ConfDelete
    }
  }

  // cambia de pagina
  changePage(page: number): void {
    if (page >= 1 && page <= this.quantity) {
      this.pagina = page;
      this.book.loadAll(this.id, page);
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