import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  @Input() card: any;
  @Input() isActive!: boolean
  @Input() deleteOn!: boolean // mira si esta activo el modo eliminar
  @Output() note = new EventEmitter<boolean>()


  // estados del componente
  select: boolean = false;
  onDelete: boolean = false;

  // icons
  faCircleCheck = faCircleCheck; // icono de check

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deleteOn']) {
      this.onDelete = false; // si el modo eliminar esta en false se desactiva la seleccion
    }
  }


  verifica(): void {
    if (this.deleteOn) {  // si esta activo el modo eliminar
      this.onSelect(); // se cambia el estado de seleccion
      this.note.emit(this.onDelete);
    } else {
      this.onDelete = false; // se deja en false el estado de eliminar
      this.note.emit(this.deleteOn); // se abre la nota
    }

  }

  onSelect(): void {
    this.onDelete = !this.onDelete; // cambia el estado de seleccion
  }
}
