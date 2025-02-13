import { Component, Inject, Input } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  // inversion de dependencias
  @Input() title!: string
  @Input() message!: string
  @Input() salida!: string

  // Parametros del constructor
  constructor(private _router: Router) {}

  CambiarRuta(): void {
    console.log(this.salida)
    this._router.navigate([this.salida])
  }
}
