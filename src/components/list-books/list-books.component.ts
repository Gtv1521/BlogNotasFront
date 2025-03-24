
import { Component, Input, SimpleChanges } from '@angular/core';
import { NotesService } from '../../services/dashboard/notes.service';
import { INotes } from '../../interfaces/INotes';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  // estados  de carga
  loader: boolean = true

  // estados de datos
  datos: any = []
  errors: any = []

  // entradas de otros componentes
  @Input() idLibreta!: string

  // arrancar los datos del componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idLibreta'] && this.idLibreta) {
      this.getNotes();
    }
  }

  constructor(private service: NotesService) { }

  // obtiene notas  de cada libreta 
  getNotes(): void {
    if (this.idLibreta && typeof this.idLibreta === 'string') {
      this.service.loadNotes(this.idLibreta).subscribe({
        next: (response) => {
          this.datos = response
          this.loader = false
        },
        error: (err) => {
          this.errors = err
          this.loader = false
        }
      })
    }
  }
}
