import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NotesService } from '../../../services/dashboard/notes.service';
import { TargetComponent } from "../../utils/target/target.component";

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

  // datas
  data: any = [];
  errors: any = [];

  private service = inject(NotesService)

  ngOnInit(): any {
    this.loadNoteBooks()
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {

    this.data = []
    this.errors = []

    this.service.loadBooks(1).subscribe({
      next: (response) => {
        this.data = response
        this.loader = false
        this.getLibreta.emit(this.data[0]?.idLibreta)
      },
      error: (err) => {
        this.errors = err
        this.loader = false
      },
    })
  }
}
