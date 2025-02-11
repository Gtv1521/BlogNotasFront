import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-reset',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss',
})
export class ResetComponent {
  // Variables para controlar el formulario
  Correo: FormGroup

  constructor(private fb: FormBuilder) {
    this.Correo = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    console.log(this.Correo.value)
  }
}
