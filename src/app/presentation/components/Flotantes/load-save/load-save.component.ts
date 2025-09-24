import { Component, input, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";

@Component({
  selector: 'app-load-save',
  imports: [FontAwesomeModule, LoaderSpinnerComponent],
  templateUrl: './load-save.component.html',
  styleUrl: './load-save.component.scss'
})
export class LoadSaveComponent {

  // estados
 @Input() loading: boolean = true;

  // iconos
  faCircleCheck = faCircleCheck; // done
}
