import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronLeft, faEllipsis, faRotateRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RequestAlertComponent } from "../../Flotantes/request-alert/request-alert.component";
import { NoteEntity } from '../../../../domain/models/note.model';
import { NotesUseCase } from '../../../../aplication/use-cases/notes.use-case';
import { noteInput } from '../../../../aplication/inputs/note,input';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { DatePipe } from '@angular/common';
import { LoaderComponent } from "../../loader/loader-point/loader.component";
import { LoaderSpinnerComponent } from "../../loader/loader-spinner/loader-spinner.component";

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, ReactiveFormsModule, RequestAlertComponent, LoaderSpinnerComponent],
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

  // estados de datos
  // dataForm!: FormGroup
  hoy: Date = new Date()
  alert: boolean = false
  loader: boolean = true
  saveLoader: boolean = false
  data: NoteEntity | null = null; // recibe datos de actualizacion 
  errors: any = ''
  responses: string | boolean = false
  Request: string = 'Quiere guardar antes de salir ?'

  // valores de entrada 
  @Input() datos: any
  @Output() cerrarNewNote = new EventEmitter<boolean>()

  private fb = inject(FormBuilder);
  private service = inject(NotesUseCase);
  private auth = inject(AuthService);

  dataForm = this.fb.group({
    title: [''],
    contenido: ['']
  });

  // icializa las variables del formulario
  ngOnInit(): void {
    this.loader = true;
    this.getNote();
  }

  getNote(): void {
    if (this.datos.idNote !== null) {
      this.service.load(this.datos.idNote).subscribe({
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
      this.data = {
        title: 'New note',
        contenido: 'Aqui puedes agregar tus pensamientos ...',
        fechaCreacion: this.hoy,
        fechaUpdate: null,
        idLibreta: this.datos.idLibreta,
        idNote: null,
        idUser: ''
      }
      this.llenar()
      this.loader = false
    }
  }

  // llena campos
  llenar(): void {
    this.dataForm.patchValue({
      title: this.data?.title,
      contenido: this.data?.contenido
    })

  }
  // cierra la pestaña de editar nota
  volver(): void {
    this.getNote();
    const valores = this.dataForm.value

    if (valores.contenido === this.data?.contenido && valores.title === this.data?.title) {
      this.cerrarNewNote.emit(false)
    } else {
      this.alert = true
    }
  }

  // respuesta del alert
  requestResponse(estado: boolean): void {
    if (estado) {
      this.save(this.datos)
      this.cerrarNewNote.emit(false)
      this.alert = false
    } else {
      this.alert = false
      this.cerrarNewNote.emit(false)
    }
  }

  // cierra el alert
  closeAlert(estado: boolean): void {
    this.alert = estado
  }

  // controla si guarda una nueva nota o si actualiza una ya creada dependiendo
  // de las caracteriscas del modelo
  save(id: string | null | undefined): void {
    if (!id) {
      this.Submit()
    } else {
      this.onUpdate()
    }
    console.log(this.datos.idLibreta);
  }

  // crea una nueva nota
  Submit(): void {
    const valores = this.dataForm.value

    const dataInsert: noteInput = {
      idBook: this.datos.idLibreta,
      idUser: `${this.auth.getUserId()}`,
      content: `${valores.contenido}`,
      title: `${valores.title}`
    }
    this.service.createNote(dataInsert).subscribe({
      next: (res) => {
        this.responses = res;
        this.loader = false;
        console.log(dataInsert.idBook);
        this.service.allNotesByBook(dataInsert.idBook);
      }, error: (err) => {
        this.errors = err;
      }
    })
    this.cerrarNewNote.emit(false)
  }

  // actualiza datos de una nota
  onUpdate(): void {
    const valores = this.dataForm.value

    const dataUpdate: noteInput = {
      idBook: this.datos.idLibreta,
      idUser: `${this.auth.getUserId()}`,
      content: `${valores.contenido}`,
      title: `${valores.title}`
    }

    console.log(dataUpdate);
    this.service.updateNote(dataUpdate, this.datos.idNote).subscribe({
      next: (res) => {
        this.responses = res;
        this.service.allNotesByBook(dataUpdate.idBook);
      },
      error: (err) => {
        this.errors = err;
      }
    });
  }
}
