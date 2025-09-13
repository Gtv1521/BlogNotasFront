import { Component, EventEmitter, Inject, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
import { bookInput } from '../../../../aplication/inputs/book.input';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';

@Component({
  selector: 'app-new-notebook',
  standalone: true,
  imports: [FontAwesomeModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './new-notebook.component.html',
  styleUrl: './new-notebook.component.scss'
})
export class NewNotebookComponent {
  // iconos
  faCircleXmark = faCircleXmark

  //  estados 
  loadig: boolean = false;
  data: string = '';
  error: string = '';

  // estados del padre
  @Output() toggleModal = new EventEmitter<boolean>();

  // inyections 
  private fb = inject(FormBuilder)
  private auth = inject(AuthService)
  private book = inject(BookUseCase)

  formulario = this.fb.group(
    {
      name: ['', [Validators.required]],
    }
  )


  onSubmit(): void {
    if (this.formulario.valid) {
      this.loadig = true;
      const DataValues = this.formulario.value;

      const insert: bookInput = {
        idUser: `${this.auth.getUserId()}`,
        name: `${DataValues.name}`
      }

      console.log(insert)
      this.book.insert(insert).subscribe({
        next: (res) => {
          this.data = res;
          this.loadig = false;
        },
        error: (err) => {
          this.error = err;
          this.loadig = false;
        }

      })

    }
  }
}
