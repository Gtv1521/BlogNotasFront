import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { bookInput } from '../../../../aplication/inputs/book.input';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { LoadSaveComponent } from "../load-save/load-save.component";
import { ActivatedRoute, Router } from '@angular/router';
import { BookEntity } from '../../../../domain/models/noteBooks.model';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { UserUseCase } from '../../../../aplication/use-cases/user.use-case';
import { User } from '../../../../domain/models/user.model';
import { throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-notebook',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, ɵInternalFormsSharedModule, ReactiveFormsModule, LoadSaveComponent, LoaderSpinnerComponent],
  templateUrl: './new-notebook.component.html',
  styleUrl: './new-notebook.component.scss'
})
export class NewNotebookComponent {
  // iconos
  faCircleXmark = faCircleXmark

  //  estados 
  hoy: Date = new Date();
  loading: boolean = false;
  loadInfo: boolean = false; // loader de informacion
  loader: boolean = false; // carga datos de inicio
  data: string = '';
  userData!: User;  // name user 
  countBooks: number = 0; // numero de libretas creadas por el usuario
  respuesta!: BookEntity; // tiene datos del libro
  error: string = '';
  idLibreta: string | null = null; // id de libreta si existe 
  doneSave: boolean = false; // activa el modal de carga 

  // inyections 
  private fb = inject(FormBuilder);  // formulario
  private auth = inject(AuthService); // acceso a session abierta
  private book = inject(BookUseCase); // acceso a data de libros
  private user = inject(UserUseCase); // acceso a usuarios
  private route = inject(ActivatedRoute); // para acceso a los datos ruta
  private router = inject(Router); // rutas 

  formulario = this.fb.group(
    {
      name: ['', [Validators.required]],
    }
  )

  // se arranca la ruta 
  ngOnInit() {

    this.idLibreta = this.route.snapshot.paramMap.get('id');
    if (this.idLibreta !== null) {
      this.loadData();
    }
    this.goLoadInformation(); // carga data de usuario
  }


  // carga informacion de la libreta a (crear o a actualizar)
  goLoadInformation(): void {
    this.loadInfo = true;
    //  data de usuario
    this.user.findById(`${this.auth.getUserId()}`).subscribe({ next: (res) => this.userData = res, error: (err) => throwError(new Error(err.error)) },);

    //  data de libretas 
    this.book.count(`${this.auth.getUserId()}`).subscribe({
      next: (res) => {
        this.countBooks = res;
        this.loadInfo = false;
      }
    })
  }

  // carga data de nota
  loadData(): void {
    this.loader = true;
    this.book.load(this.idLibreta).subscribe({
      next: (res) => {
        this.respuesta = res;
        this.llenarData();
        this.loader = false;
      },
      error: (err) => {
        this.loader = false;
        this.error = err;
      }
    })
  }

  // llena los datos del form
  llenarData(): void {
    // this.book.
    this.formulario.patchValue({
      name: this.respuesta.nameBook,
    });
  }

  // inserta una libreta nueva
  onSubmit(): void {
    if (this.formulario.valid) {
      this.doneSave = true;
      this.loading = true;
      const DataValues = this.formulario.value;

      const insert: bookInput = {
        idUser: `${this.auth.getUserId()}`,
        name: `${DataValues.name}`
      }

      if (this.idLibreta === null) {
        this.onCreated(insert);
      } else {
        this.onUpdate(insert);
      }
    }
  }

  // crea una libreta
  onCreated(insert: bookInput): void {
    this.book.insert(insert).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        this.closeNotification();
        this.book.loadAll(`${this.auth.getUserId()}`, 1); // se refrescan las notas 
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    })
  }

  // actualiza titulo de libreta
  onUpdate(update: bookInput): void {
    //  se valida que alla cambiado el nombre
    if (update.name === this.respuesta.nameBook) {
      this.loading = false;
      this.doneSave = false;
      this.router.navigate(["/home"])
    } else {
      this.book.update(update, `${this.idLibreta}`).subscribe({
        next: res => {
          this.loading = false;
          this.closeNotification(); // cierra el modal 
        },
        error: err => {
          throw Error(err);
          this.loading = false;
        }
      });
    }

  }

  // cierra la notificacion 
  closeNotification(): void {
    setTimeout(() => {
      this.doneSave = false;
      this.goHome()
    }, 600);
  }

  // salida a home
  goHome(): void {
    this.router.navigate(['/home']);
  }
}
