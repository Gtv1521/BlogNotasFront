import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() id: string | null = '';
  @Output() getLibreta = new EventEmitter<string>();
 
  // estados
  loader: boolean = true;
  modal: boolean = false;

  // datas
  data: any = [];
  errors: any = [];

  constructor(private service: NotesService) { };

  ngOnInit(): any {
    this.loadNoteBooks()
  }

  // carga los datos las libreyas
  loadNoteBooks(): any {

    this.data = []
    this.errors = []
    
    if (this.id) {
      this.service.loadBooks(this.id, 1).subscribe({
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
}
