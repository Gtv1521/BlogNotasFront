import { Component, EnvironmentInjector, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  @Input() card: any;
  @Input() isActive!: boolean
  // @Output() noteSelected = new EventEmitter<void>();
  @Output() note = new EventEmitter<void>()

  select: boolean = false

  verifica(): void {
    // this.noteSelected.emit();
    this.note.emit();
  }
}
