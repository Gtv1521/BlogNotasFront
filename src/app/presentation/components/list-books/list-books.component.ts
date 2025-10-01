
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { NoteComponent } from '../Dasboard/notes/note.component';
import { NotesUseCase } from '../../../aplication/use-cases/notes.use-case';
import { NoteEntity } from '../../../domain/models/note.model';
import { LoaderSpinnerComponent } from '../loader/loader-spinner/loader-spinner.component';
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BookUseCase } from '../../../aplication/use-cases/book.use-case';
import { AuthService } from '../../../../services/utils/Auth/auth.service';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [NoteComponent, LoaderSpinnerComponent, AsyncPipe, FontAwesomeModule],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  // estados  de carga
  loader: boolean = false
  isActive: boolean = false
  selectedNoteId: string | null = null;
  quantity: number = 1; // cantidad de paginas
  pagina: number = 1; // pagina actual
  onDelete: boolean = false; // accion de eliminar notas

  // icons
  faTrash = faTrash; // delete 
  faChevronLeft = faChevronLeft // regresar
  fachevronRight = faChevronRight // avanzar

  // estados de datos
  datos: NoteEntity[] = []; // array de notas
  arrayDelete: string[] = [];  // array de notas a eliminar
  quantityDelete: number = 0 // cantidad de notas a eliminar

  // entradas de otros componentes
  @Input() idLibreta!: string; // id de la libreta seleccionada
  @Output() dataNota = new EventEmitter<any>()

  // inyeccion de dependencias
  private service = inject(NotesUseCase);
  private book = inject(BookUseCase);
  private auth = inject(AuthService);

  //  estados del caso de uso 
  notas$ = this.service.notas$;
  errores$ = this.service.errors$;
  loading$ = this.service.loading$;


  // arrancar los datos del componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idLibreta'] && this.idLibreta) {
      this.loader = true
      this.pagina = 1;
      this.getNotes(this.idLibreta);
    }
  }

  // obtiene notas  de cada libreta 
  getNotes(id: string): void {
    if (this.idLibreta && typeof this.idLibreta === 'string') {
      // llama todas las libretas segun pagina
      this.service.allNotesByBook(id, this.pagina);

      // obtiene la cantidad de notas x libreta
      this.service.count(this.idLibreta).subscribe({
        next: (count) => {
          this.quantity = Math.ceil(count / 20);
        },
        error: (err) => {
          console.error('Error al obtener la cantidad de notas:', err);
        }
      });
    }
  }

  // abre una nota nueva
  dataNote(data: any, estado: boolean, deleteOn: boolean): void {
    if (this.onDelete) {
      this.selectNote(data.idNote, deleteOn); // se llama a la funcion de seleccionar notas
    } else {
      this.dataNota.emit({ ...data, estado }); // se emite la nota seleccionada para editar
    }
  }

  // cambia de pagina
  changePage(page: number): void {
    if (page >= 1 && page <= this.quantity) {
      this.pagina = page;
      this.service.allNotesByBook(`${this.idLibreta}`, this.pagina);
    }
  }

  changeDelete(): void {
    this.onDelete = !this.onDelete;
    this.arrayDelete = [];
    this.quantityDelete = 0;
  }
  // selecciona las notas a eliminar
  selectNote(id: string, isChecked: boolean): void {
    if (isChecked) {
      this.arrayDelete.push(id);
    } else {
      const index = this.arrayDelete.indexOf(id);
      if (index > -1) {
        this.arrayDelete.splice(index, 1);
      }
    }
    this.quantityDelete = this.arrayDelete.length;
  }

  // activa la funcion de borrar notas
  deleted(): void {
    this.arrayDelete.forEach(element => {
      this.service.deleteNote(element).subscribe({
        next: (res) => console.log(res),
        error: (err) => console.error(err)
      });
    });

    this.arrayDelete = [];
    this.quantityDelete = 0;
    this.onDelete = false;
    console.log(this.idLibreta);
    this.book.loadAll(this.auth.getUserId()!, 1); // recarga las libretas
    this.service.allNotesByBook(this.idLibreta, 1);
  }
}
