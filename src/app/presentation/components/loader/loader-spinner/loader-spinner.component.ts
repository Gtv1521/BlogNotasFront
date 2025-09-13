import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader-spinner',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loader-spinner.component.html',
  styleUrl: './loader-spinner.component.scss'
})
export class LoaderSpinnerComponent {
  faSpinner = faSpinner
}
