import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'app-sigin',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './sigin.component.html',
  styleUrl: './sigin.component.scss',
})
export class SiginComponent {
  UsuarioForm: FormGroup
  // estados del formulario
  togglepassword: boolean = false

  constructor(private fb: FormBuilder) {
    this.UsuarioForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  cambiarPass() {
    this.togglepassword = !this.togglepassword
  }

  onSubmit() {
    console.log(this.UsuarioForm.value)
  }
}
