import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { NoteEntity } from '../../../../domain/models/note.model';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})

export class NoteComponent {

  @Input() card!: NoteEntity; // entrada de le
  @Input() isActive!: boolean; // pasa el id de la nota selecionada
  @Input() deleteOn!: boolean // mira si esta activo el modo eliminar
  @Output() note = new EventEmitter<boolean>() //devuelve la nota seleccionada


  // estados del componente
  onDelete: boolean = false; // estado de seleccion para eliminar

  // icons
  faCircleCheck = faCircleCheck; // icono de check

  // detecta cambios en las propiedades de entrada
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deleteOn']) {
      this.onDelete = false; // si el modo eliminar esta en false se desactiva la seleccion
    }
  }

// verifica si se abre la nota o se selecciona para eliminar
  verifica(): void {
    if (this.deleteOn) {  // si esta activo el modo eliminar
      this.onSelect(); // se cambia el estado de seleccion
      this.note.emit(this.onDelete);
    } else {
      this.onDelete = false; // se deja en false el estado de eliminar
      this.note.emit(this.deleteOn); // se abre la nota
    }

  }

  // cambia el estado de seleccion para eliminar
  onSelect(): void {
    this.onDelete = !this.onDelete; // cambia el estado de seleccion
  }
}
