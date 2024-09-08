import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConexionUrlService } from '../../services/conexion-url.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm: FormGroup;

  data: any;
  IsLoading: boolean = true;
  errorMensage: string | null = null;

  constructor(private fb: FormBuilder, private _conexion: ConexionUrlService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchData();
  }

  showPassword: boolean = false;  // Controla si la contraseña se muestra o no
  upLabelUser: boolean = false;
  upLabelPass: boolean = false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  mueveLabelUser() {
    this.upLabelUser = true;
  }
  mueveLabelPass() {
    this.upLabelPass = true;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
    }
  }

  fetchData(): void {
    this.IsLoading = true; // muestre el loading

    this._conexion.getAllUser().subscribe({
      next: (response) => {
        this.data = response;
        this.IsLoading = false; // oculte el loading
      },
      error: (error) => {
        this.errorMensage = error.message;
        this.IsLoading = false; // oculte el loading
      }  // aquí deberías manejar el error según tus necesidades
    });
  }
}


