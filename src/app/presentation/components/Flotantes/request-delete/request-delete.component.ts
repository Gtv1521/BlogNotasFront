import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request-delete',
  imports: [],
  templateUrl: './request-delete.component.html',
  styleUrl: './request-delete.component.scss'
})
export class RequestDeleteComponent {

  // estados
  @Input() request = "Pregunta ?";
  @Output() response = new EventEmitter<boolean>();

  // boton aceptar
  goAcept(): void{
    this.response.emit(true);
  }

  // boton cancelar
  goCancel(): void {
    console.log(false)
    this.response.emit(false);
  }
}
