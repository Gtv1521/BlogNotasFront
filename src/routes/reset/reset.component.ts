import { NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { UsersService } from '../../services/users.service'
import { AlertComponent } from '../../components/utils/alert/alert.component'
import { ApiResponse } from '../../interfaces/apiResponse'

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AlertComponent],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent {
  private fb = inject(FormBuilder)
  private _service = inject(UsersService)

  // Estados
  respuesta: boolean = false
  error: boolean = false
  loading: boolean = false

  // Varibles
  data: any = {}

  Correo = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
  })

  title = 'Mensaje enviado al correo'
  message = 'Te hemos enviado un correo con instrucciones para restablecer tu contraseña.'
  salida = '/home/login'

  onSubmit() {
    if (this.Correo.valid) {
      const Datos = this.Correo.get('correo')?.value as string
      this.loading = true
      this._service.resetPassword(Datos).subscribe({
        next: (response) => {
          this.loading = false
          this.data = response
          this.respuesta = true
        },
        error: (error) => {
          console.error('Error al restablecer la contraseña:', error)
        },
        complete: () => {
          console.log('Proceso de restablecimiento de contraseña completado')
        },
      })
    } else {
      console.log('Formulario no válido')
    }
  }
}
