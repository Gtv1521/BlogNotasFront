import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TargetComponent } from "../../utils/target/target.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { BookEntity } from '../../../../domain/models/noteBooks.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [TargetComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {

  // datos de componente padre
  @Output() getLibreta = new EventEmitter<string>();

  // estados
  loader: boolean = true;
  modal: boolean = false;

  isActive: boolean = false
  selectItem: string | null = null
  id: string = ''

  // datas
  data: BookEntity[] = [];
  errors: any = [];

  private service = inject(BookUseCase)
  private auth = inject(AuthService)

  ngOnInit(): any {
    this.id = `${this.auth.getUserId()}`
    this.loadNoteBooks()
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {

    this.service.loadAll(this.id, 1).subscribe({
      next: (response) => {
        this.data = response
        this.loader = false
        this.getLibreta.emit(this.data[0].id)
        this.onNoteSelected(this.data[0].id)
      },
      error: (err) => {
        this.errors = err
        this.loader = false
      },
    })
  }

  // activa componente en uso 
  onNoteSelected(id: string): void {
    if (this.selectItem !== id) {
      this.selectItem = this.selectItem === id ? null : id;
      this.getLibreta.emit(id)
    }
  }
}