import { Component, EventEmitter, Input, Output } from '@angular/core';
import { INotes } from '../../../interfaces/INotes';
import { INotebooks } from '../../../interfaces/INoteBooks';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [],
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent {

@Input() item!: INotebooks
@Input() isActive = false
@Output() noteSelected = new EventEmitter<void>()

// activa este 
handleActive(): void {
  this.noteSelected.emit();
}
}
