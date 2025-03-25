import { NgIf } from '@angular/common'
import { Component, inject } from '@angular/core'
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { UsersService } from '../../services/users.service'
import { IResponseLogin, IUserlogin } from '../../interfaces/IUser'
import { AuthService } from '../../services/utils/Auth/auth.service'

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

  // valores del constructor
  private fb = inject(FormBuilder)
  private service = inject(UsersService)
  private auth = inject(AuthService)
  private router = inject(Router)

  //  declaracion de valisacion de formulario
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  })

  // muestra la constraseñ
  CambiarPass() {
    this.togglepassword = !this.togglepassword
  }

  // cierra alerta 
  CerrarAlert() {
    this.statusError = false
  }

  //  hace inicio de session de usuario
  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true
      const valoresFormulario = this.userForm.value

      const User: IUserlogin = {
        Email: valoresFormulario.email!,
        Password: valoresFormulario.password!,
      }

      this.service.login(User).subscribe({
        next: (response) => {
          this.loading = false
          this.data = response
          this.auth.setAuth(response.id, response.token) /* se hace inicio de session por medio de variables */
          this.router.navigate(['/dashboard']) /* se arranca la session en el dashboard */
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
