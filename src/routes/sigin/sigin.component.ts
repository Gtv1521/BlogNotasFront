import { NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { UsersService } from '../../services/users.service'
import { IResponseLogin, ISignin } from '../../interfaces/IUser'
import { Router } from '@angular/router'

@Component({
  selector: 'app-sigin',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.scss',
})
export class SiginComponent {
  private _fb = inject(FormBuilder)
  private _service = inject(UsersService)

  // estados del formulario
  togglepassword: boolean = false
  loading: boolean = false
  errorStatus: boolean = false
  errors: any = {}
  data: IResponseLogin | undefined

  constructor(private _router: Router) {}
  UsuarioForm = this._fb.group(
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

      const User: ISignin = {
        Email: valoresFormulario.email!,
        Password: valoresFormulario.password!,
        Name: valoresFormulario.name!,
        Role: 'User',
      }
      this._service.signin(User).subscribe({
        next: (response) => {
          this.loading = false
          this.data = response
          localStorage.setItem('token', response.token)
          this._router.navigate(['/dashboard', this.data?.id])
        },
        error: (error) => {
          this.loading = false
          this.errorStatus = true
          this.errors = error
          console.log(error)
        },
      })
    }
  }
}
