import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note-data.component.html',
  styleUrl: './note-data.component.scss'
})
export class NoteDataComponent {
  // icons
  faCheck = faCheck // guardar
  faChevronLeft = faChevronLeft // volver
  faEllipsis = faEllipsis // config
  
  // valores de entrada 
  @Input() title!: string
  @Input() contenido!: string
  @Output() cerrarNewNote = new EventEmitter<boolean>()

  private fb = inject(FormBuilder) 

  // se hace
  dataForm = this.fb.group({
    title: [this.title, [Validators.required]],
    contenido: [this.contenido, [Validators.required]]
  });
}
