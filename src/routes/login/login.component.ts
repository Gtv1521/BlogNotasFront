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
          this.data = response
          this.loading = false
          localStorage.setItem('token', response.token)
          console.log(response)
          this._router.navigate(['/dashboard'])
        },
        error: (error) => {
          console.log(error.message)
        },
      })
    }
  }
}
