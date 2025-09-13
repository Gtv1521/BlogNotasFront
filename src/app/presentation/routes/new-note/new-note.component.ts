import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-note',
  standalone: true,
  imports: [],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.scss'
})
export class NewNoteComponent {

  @Input() title!: string
  @Input() contenido!: string

  constructor(private router: Router) { }

  saveNote(): void {
    this.router.navigate(['/sigin'])
  }

}
