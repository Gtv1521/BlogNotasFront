import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConexionUrlService } from '../../services/conexion-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.scss'
})
export class SiginComponent {

  userForm: FormGroup;

  data: any;
  IsLoading: boolean = false;
  errorMensage: string | null = null;
  showPassword: boolean = false; // estado para mostrar contraseña

  constructor(private fb: FormBuilder, private router: Router, private _conexion: ConexionUrlService) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  Cambiar = () => {
    this.showPassword = !this.showPassword;
  }


  onSubmit = () => {
    this.IsLoading = true; // muestra el loading
    if (this.userForm.valid) {
      this._conexion.postUser(this.userForm.value).subscribe({
        next: (response) => {
          this.data = response;
          this.IsLoading = false; // oculte el loading

          if (this.data?.status === 201) { // valida el status
            this._conexion.setToken(response.token); // envia el token a localstorage
            this.router.navigate(['/dashboard']); //cambia la ruta a el dashboard
          }
        },
        error: (error) => {
          this.errorMensage = error.error.message;
          this.IsLoading = false; // oculte el loading
        }
      });
    }
  }



}
