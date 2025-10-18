import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionEntity } from '../../../domain/models/session.model';
import { SessionUseCase } from '../../../aplication/use-cases/session.use-case';
import { AuthService } from '../../../../services/utils/Auth/auth.service';
import { logInput } from '../../../aplication/inputs/log.input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Estados de la application
  togglepassword: boolean = false;
  loading: boolean = false;
  errors: string | any = '';
  statusError: boolean = false;
  data: SessionEntity | undefined;

  // valores del constructor
  private fb = inject(FormBuilder);
  private service = inject(SessionUseCase);
  private auth = inject(AuthService);
  private router = inject(Router);

  //  declaracion de valisacion de formulario
  userForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  // muestra la constraseñ
  CambiarPass() {
    this.togglepassword = !this.togglepassword;
  }

  // cierra alerta
  CerrarAlert() {
    this.statusError = false;
  }

  //  hace inicio de session de usuario
  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const valoresFormulario = this.userForm.value;

      const User: logInput = {
        mail: valoresFormulario.email!,
        password: valoresFormulario.password!,
      };

      this.service.logIn(User).subscribe({
        next: (response) => {
          this.loading = false;
          this.data = response;
          this.auth.setAuth(
            response.idUser
          ); /* se hace inicio de session por medio de variables */
          this.router.navigate([
            '/loader',
          ]); /* se arranca la session en el dashboard */
        },
        error: (error) => {
          this.loading = false;
          this.errors = error;
          this.statusError = true;
        },
      });
    }
  }
}
