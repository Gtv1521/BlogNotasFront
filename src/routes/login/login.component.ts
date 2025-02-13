import { CommonModule, NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { IResponseLogin, IUser, IUserlogin } from '../../interfaces/IUser'
import { ApiResponse } from '../../interfaces/apiResponse'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Estados de la application
  togglepassword: boolean = false
  loading: boolean = false
  errors: any = {}
  statusError: boolean = false
  data: IResponseLogin | undefined

  private _fb = inject(FormBuilder)
  private _service = inject(UsersService)

  constructor(private _router: Router) {}

  userForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  CambiarPass() {
    this.togglepassword = !this.togglepassword
  }

  CerrarAlert() {
    this.statusError = false
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true
      const valoresFormulario = this.userForm.value

      const User: IUserlogin = {
        Email: valoresFormulario.email!,
        Password: valoresFormulario.password!,
      }

      this._service.login(User).subscribe({
        next: (response) => {
          this.loading = false
          this.data = response
          localStorage.setItem('token', response.token)
          this._router.navigate(['/dashboard', this.data?.id])
        },
        error: (error) => {
          this.loading = false
          this.errors = error
          this.statusError = true
        },
      })
    }
  }
}
