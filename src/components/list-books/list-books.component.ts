
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NotesService } from '../../services/dashboard/notes.service';
import { LoaderComponent } from '../loader/loader.component';
import { NoteComponent } from '../Dasboard/notes/note.component';
import { INotes } from '../../interfaces/INotes';
import { NoteDataComponent } from '../Dasboard/note-data/note-data.component';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [LoaderComponent, NoteComponent],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  // estados  de carga
  loader: boolean = false
  isActive: boolean = false
  selectedNoteId: string | null = null;
  note: boolean = false
  title: string = ''
  contenido: string = ''

  // estados de datos
  datos: any = []
  errors: any = []

  // entradas de otros componentes
  @Input() idLibreta!: string
  @Output() dataNota = new EventEmitter<any>()

  // arrancar los datos del componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idLibreta'] && this.idLibreta) {
      this.getNotes();
    }
  }

  constructor(private service: NotesService) { }

  // obtiene notas  de cada libreta 
  getNotes(): void {
    this.loader = true
    this.datos = []
    this.errors = []

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

  // Verificar si una tarjeta está seleccionada
  // onNoteSelected(noteId: string): void {
  //   this.selectedNoteId = this.selectedNoteId === noteId ? null : noteId;
  // }

  // abre una nota nueva
  dataNote(data: any, estado: boolean): void {
    this.dataNota.emit({...data, estado})
  }

  cerrarNewNote(estado: boolean): void {
    this.note = estado
  }
}
