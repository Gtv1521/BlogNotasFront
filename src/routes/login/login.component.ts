import { CommonModule, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userForm: FormGroup

  // Estados de la application
  togglepassword: boolean = false

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  CambiarPass() {
    this.togglepassword = !this.togglepassword
  }

  onSubmit() {
    console.log(this.userForm.value)
  }
}
