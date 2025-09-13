import { NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { SessionUseCase } from '../../../aplication/use-cases/session.use-case'
import { SessionEntity } from '../../../domain/models/session.model'
import { singInput } from '../../../aplication/inputs/sing.input'


@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.scss',
})
export class SiginComponent {

  private fb = inject(FormBuilder)
  private service = inject(SessionUseCase)

  // estados del formulario
  togglepassword: boolean = false
  loading: boolean = false
  errorStatus: boolean = false
  errors: any = {}
  data: SessionEntity | undefined

  constructor(private _router: Router) {}
  UsuarioForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.compararCampos('password', 'confirmPassword'),
    },
  )

  CerrarAlert() {
    this.errorStatus = false
  }

  compararCampos(campo1: string, campo2: string) {
    return (formGroup: AbstractControl) => {
      const control1 = formGroup.get(campo1)
      const control2 = formGroup.get(campo2)

      if (!control1 || !control2) return null

      if (control1.value !== control2.value) {
        control2.setErrors({ mismatch: true })
      } else {
        control2.setErrors(null)
      }
      return null
    }
  }

  cambiarPass() {
    this.togglepassword = !this.togglepassword
  }

  onSubmit() {
    if (this.UsuarioForm.valid) {
      this.loading = true
      const valoresFormulario = this.UsuarioForm.value

      const User: singInput = {
        mail: valoresFormulario.email!,
        password: valoresFormulario.password!,
        confirPass: valoresFormulario.confirmPassword!,
        name: valoresFormulario.name!,
        role: 'User',
      }
      this.service.sigIn(User).subscribe({
        next: (response) => {
          this.data = response
          localStorage.setItem('token', response.token)
          
          this.loading = false
          this._router.navigate(['/dashboard'])

        },
        error: (error) => {
          this.loading = false
          this.errorStatus = true
          this.errors = error
        },
      })
    }
  }
}
