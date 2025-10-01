import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { bookInput } from '../../../../aplication/inputs/book.input';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { LoadSaveComponent } from "../load-save/load-save.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-notebook',
  standalone: true,
  imports: [FontAwesomeModule, ɵInternalFormsSharedModule, ReactiveFormsModule, LoadSaveComponent],
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

  doneSave: boolean = false;

  // inyections 
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private book = inject(BookUseCase);
  private router = inject(Router);

  formulario = this.fb.group(
    {
      name: ['', [Validators.required]],
    }     
  )


  onSubmit(): void {
    if (this.formulario.valid) {
      this.doneSave = true;
      this.loadig = true;
      const DataValues = this.formulario.value;

      const insert: bookInput = {
        idUser: `${this.auth.getUserId()}`,
        name: `${DataValues.name}`
      }

      this.book.insert(insert).subscribe({
        next: (res) => {
          this.data = res;
          this.loadig = false;
          this.closeNotification();
          this.book.loadAll(`${this.auth.getUserId()}`, 1); // se refrescan las notas 
        },
        error: (err) => {
          this.error = err;
          this.loadig = false;
        }
      })
    }
  }

  closeNotification(): void {
    setTimeout(() => {
      this.doneSave = false;
      this.goHome()
    }, 600);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
