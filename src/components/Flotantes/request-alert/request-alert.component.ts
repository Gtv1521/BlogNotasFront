import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-request-alert',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './request-alert.component.html',
  styleUrl: './request-alert.component.scss'
})
export class RequestAlertComponent {

  // icons 
  faCircleXmark = faCircleXmark

  // valores de entrada
  @Input() Request: string = ''
  @Output() Response = new EventEmitter<boolean>()

  // funcion de salida
  respuesta(res: boolean): void {
    this.Response.emit(res);
  }
}
