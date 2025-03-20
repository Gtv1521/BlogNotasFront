import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-notebook',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './new-notebook.component.html',
  styleUrl: './new-notebook.component.scss'
})
export class NewNotebookComponent {
  faCircleXmark = faCircleXmark
}
