
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { NoteComponent } from '../Dasboard/notes/note.component';
import { NotesUseCase } from '../../../aplication/use-cases/notes.use-case';
import { NoteEntity } from '../../../domain/models/note.model';
import { LoaderSpinnerComponent } from '../loader/loader-spinner/loader-spinner.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [NoteComponent, LoaderSpinnerComponent, AsyncPipe],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.scss'
})
export class ListBooksComponent {
  // estados  de carga
  loader: boolean = false
  isActive: boolean = false
  selectedNoteId: string | null = null;
  note: boolean = false

  // estados de datos
  datos: NoteEntity[] = []

  // entradas de otros componentes
  @Input() idLibreta!: string
  @Output() dataNota = new EventEmitter<any>()

  // inyeccion de dependencias
  private service = inject(NotesUseCase)

  //  estados del caso de uso 
  notas$ = this.service.notas$;
  errores$ = this.service.errors$;
  loading$ = this.service.loading$;


  // arrancar los datos del componente
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idLibreta'] && this.idLibreta) {
      this.loader = true
      this.getNotes(this.idLibreta);
    }
  }

  // obtiene notas  de cada libreta 
  getNotes(id: string): void {
    if (this.idLibreta && typeof this.idLibreta === 'string') {
      this.service.allNotesByBook(id);
    }
  }

  // abre una nota nueva
  dataNote(data: any, estado: boolean): void {
    this.dataNota.emit({ ...data, estado })
  }

  // cierra el componente notas 
  cerrarNewNote(estado: boolean): void {
    this.note = estado
  }
}
