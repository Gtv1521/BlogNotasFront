import { Component, EventEmitter, inject, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { RequestAlertComponent } from "../../Flotantes/request-alert/request-alert.component";
import { NotesService } from '../../../services/dashboard/notes.service';

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, RequestAlertComponent],
  templateUrl: './note-data.component.html',
  styleUrl: './note-data.component.scss'
})
export class NoteDataComponent {
  // icons
  faCheck = faCheck // guardar
  faChevronLeft = faChevronLeft // volver
  faEllipsis = faEllipsis // config

  // estados de datos
  dataForm!: FormGroup
  hoy: Date = new Date()
  alert: boolean = false
  loader: boolean = true
  data: any = []
  errors!: []
  Request: string = 'Quiere guardar antes de salir ?'

  // valores de entrada 
  @Input() datos: any
  @Output() cerrarNewNote = new EventEmitter<boolean>()

  constructor(private fb: FormBuilder, private sevice: NotesService) {
    this.dataForm = this.fb.group({
      title: [''],
      contenido: ['']
    });

  }

  // icializa las variables del formulario
  ngOnInit(): void {
    this.loader = true
    this.data = []

    if (this.datos.idNote !== null) {
      this.sevice.loadOneNote(this.datos.idNote).subscribe({
        next: (res) => {
          this.data = res
          this.loader = false
          this.llenar()
        },
        error: (err) => {
          this.errors = err
          this.loader = false
        }
      })
    } else {
      this.data = {
        title: 'New note',
        contenido: 'Aqui puedes agregar tus pensamientos ...',
        fechaCreacion: '',
        fechaUpdate: '',
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
      title: this.data.title,
      contenido: this.data.contenido
    })

  }
  // cierra la pestaña de editar nota
  volver(): void {
    const valores = this.dataForm.value

    if (valores.contenido === this.data.contenido && valores.title === this.data.title) {
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

  // se activa el boton guardar
  save(id: string | null): void {
    if (id === null) {
      this.Submit()
    } else {
      this.onUpdate()
    }

  }

  // crea una nueva nota
  Submit(): void {
    console.log('Submit() se ejecutó');
    const valores = this.dataForm.value
    this.sevice.createdNote({ ...valores, idLibreta: this.datos.idLibreta }).subscribe({
      next: (res) => {
        console.log(res)
      }, error: (err) => {
        console.log(err)
      }
    })
    this.cerrarNewNote.emit(false)
  }

  // actualiza datos de una nota
  onUpdate(): void {
    console.log('Actualizado')
  }
}
