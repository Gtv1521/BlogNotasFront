import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TargetComponent } from "../../utils/target/target.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { BookEntity } from '../../../../domain/models/noteBooks.model';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { AsyncPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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
  // loader: boolean = true;
  modal: boolean = false;

  isActive: boolean = false
  selectItem: string | null = null
  id: string = ''

  // icons
  faTrash = faTrash; // delete
  faPenToSquare = faPenToSquare// editar 


  // datas
  // data: BookEntity[] = [];
  // errors: any = [];

  private service = inject(BookUseCase)
  private auth = inject(AuthService)

  books$ = this.service.book$;
  loading$ = this.service.loading$;
  error$ = this.service.errors$;

  ngOnInit(): any {
    this.id = `${this.auth.getUserId()}`
    this.loadNoteBooks()
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {

    // consulta de todas las libretas
    this.service.loadAll(this.id, 1);

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
}