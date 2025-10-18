import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() warning: string = 'Advertencias' 
  @Output() aceptar = new EventEmitter();

  entendido(): void {
    this.aceptar.emit();
  }
}
