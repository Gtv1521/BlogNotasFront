import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookEntity } from '../../../../domain/models/noteBooks.model';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [],
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent {

@Input() item!: BookEntity
@Input() isActive = false
@Output() noteSelected = new EventEmitter<void>()

// activa este 
handleActive(): void {
  this.noteSelected.emit();
}
}
