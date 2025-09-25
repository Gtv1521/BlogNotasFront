import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronLeft, faEllipsis, faL, faRotateRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RequestAlertComponent } from "../../Flotantes/request-alert/request-alert.component";
import { NoteEntity } from '../../../../domain/models/note.model';
import { NotesUseCase } from '../../../../aplication/use-cases/notes.use-case';
import { noteInput } from '../../../../aplication/inputs/note,input';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { DatePipe } from '@angular/common';
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";
import { LoadSaveComponent } from "../../Flotantes/load-save/load-save.component";
import { Router } from '@angular/router';
import { NoteDataService } from '../../../services/note.data.service';

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, ReactiveFormsModule, RequestAlertComponent, LoaderSpinnerComponent, LoadSaveComponent],
  templateUrl: './note-data.component.html',
  styleUrl: './note-data.component.scss'
})
//  Crea una nueva nota o actualiza datos de una nota que ya esta creada 

export class NoteDataComponent {
  // icons
  faCheck = faCheck // guardar
  faChevronLeft = faChevronLeft // volver
  faEllipsis = faEllipsis // config
  faSpinner = faSpinner // spinner
  faRotateRight = faRotateRight

  //  estados de entrada
  idNota!: string | null;
  idLibreta!: string;

  // estados de datos
  hoy: Date = new Date();
  alert: boolean = false;
  loader: boolean = true;
  saveLoader: boolean = false;
  doneSave: boolean = false;
  data: NoteEntity | null = null; // recibe datos de actualizacion 
  errors: any = '';
  responses: string | boolean = false;
  Request: string = 'Quiere guardar antes de salir ?';

  // Entradas en el constructor
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private service = inject(NotesUseCase);
  private auth = inject(AuthService);
  private noteService = inject(NoteDataService);

  //  agrupa los inputs del formulario 
  dataForm = this.fb.group({
    title: [''],
    contenido: ['']
  });

  // inicializa las variables del formulario
  ngOnInit(): void {
    this.loader = true;
    this.getDataNote();
    this.getNote();
    this.idLibreta;
  }

  // llama los datos de la ruta
  getDataNote(): void {
    const response = this.noteService.getNote();
    this.idNota = response.idNota;
    this.idLibreta = response.idLibreta;
  }

  // Llama los datos para 
  getNote(): void {
    if (this.idNota !== null) {
      this.service.load(`${this.idNota}`).subscribe({
        next: (res) => {
          this.data = res;
          this.loader = false;
          this.llenar();
        },
        error: (err) => {
          this.errors = err;
          this.loader = false;
        }
      })
    } else {
      //  Este es el inicio de una nota vacia 
      this.data = {
        title: 'Nota nueva',
        contenido: 'Aqui puedes agregar tus pensamientos ...',
        fechaCreacion: this.hoy,
        fechaUpdate: null,
        idLibreta: this.idLibreta,
        idNote: null,
        idUser: ''
      }
      this.llenar()
      this.loader = false
    }
  }

  // llena campos en caso de update
  llenar(): void {
    this.dataForm.patchValue({
      title: this.data?.title,
      contenido: this.data?.contenido
    })

  }

  // cierra la pestaña de editar nota
  volver(): void {
    const valores = this.dataForm.value

    if (valores.contenido === this.data?.contenido && valores.title === this.data?.title) {
      this.goHome();
    } else {
      this.alert = true
    }
  }

  // respuesta del alert
  requestResponse(estado: boolean): void {
    if (estado) {
      this.save(this.idNota);
      this.loader = true;
      this.alert = false; // cierra modal de alerta
      this.doneSave = true; // carga spiner guarda nota
      this.closeAlert()// cierra modal nota
    } else {
      this.alert = false;
      this.goHome(); // cierra modal nota
    }
  }

  // cierra el alert
  closeAlert(): void {
    setTimeout(() => {
      this.goHome()
    }, 800)
  }
  // salida al home
  goHome(): void {
    this.router.navigate(['/home'])
  }

  // controla si guarda una nueva nota o si actualiza una ya creada dependiendo
  // de las caracteriscas del modelo
  save(id: string | null | undefined): void {
    if (!id) {
      this.Submit();
    } else {
      this.onUpdate();
    }
    this.doneSave = true;
  }

  // espera para cambiar el estado de guardado
  spinnerDone(): void {
    setTimeout(() => {
      this.doneSave = false;
    }, 700);
  }

  // crea una nueva nota
  Submit(): void {
    this.loader = true;
    const valores = this.dataForm.value

    const dataInsert: noteInput = {
      idBook: this.idLibreta,
      idUser: `${this.auth.getUserId()}`,
      content: `${valores.contenido}`,
      title: `${valores.title}`
    }
    console.log(dataInsert);

    this.service.createNote(dataInsert).subscribe({
      next: (res) => {
        this.responses = res;
        this.loader = false; // termina la carga de la nota nueva
        this.closeAlert(); // cierra el modulo de notas 
        this.service.allNotesByBook(dataInsert.idBook); // refresca las notas 
      }, error: (err) => {
        this.errors = err;
      }
    })
    setTimeout(() => {
      this.goHome();
    }, 900);
  }

  // actualiza datos de una nota
  onUpdate(): void {
    this.loader = true;
    const valores = this.dataForm.value

    const dataUpdate: noteInput = {
      idBook: `${this.data?.idLibreta}`,
      idUser: `${this.auth.getUserId()}`,
      content: `${valores.contenido}`,
      title: `${valores.title}`
    }

    this.service.updateNote(dataUpdate, `${this.idNota}`).subscribe({
      next: (res) => {
        this.responses = res;
        console.log(res)
        this.service.allNotesByBook(dataUpdate.idBook); // refresca las notas
        this.getNote(); // se carga la nota de nuevo
        this.loader = false;
        this.spinnerDone(); // cierra el spinner
      },
      error: (err) => {
        this.errors = err;
      }
    });
  }
}
