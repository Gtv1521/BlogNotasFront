import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { BookEntity } from '../../../../domain/models/noteBooks.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent {

  // estados entreda
  @Input() item!: BookEntity; // data de libro
  @Input() isActive = false; // libro seleccionado
  @Input() deleteOn = false; // activa borrado
  @Output() noteSelected = new EventEmitter<boolean>(); // funcion de seleccion

  // estados
  onDelete: boolean = false;

  // iconos
  faCircleCheck = faCircleCheck;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deleteOn'] && !this.deleteOn) {
      this.onDelete = false;
    }
  }

  // activa este 
  handleActive(): void {
    if (this.deleteOn) {
      this.onDelete = !this.onDelete;
    }

    this.noteSelected.emit(this.onDelete);
  }


}
