import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faChevronLeft, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { INotes } from '../../../interfaces/INotes';
import { DatePipe } from '@angular/common';
import { AlertComponent } from '../../utils/alert/alert.component';
import { RequestAlertComponent } from "../../Flotantes/request-alert/request-alert.component";

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, AlertComponent, RequestAlertComponent],
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
  Request: string = 'Quiere guardar antes de salir ?'

  // valores de entrada 
  @Input() datos: INotes = {
    idNote: '',
    title: '',
    contenido: '',
    idUser: '',
    idLibreta: '',
    fechaCreacion: '',
    fechaUpdate: ''
  };

  @Output() cerrarNewNote = new EventEmitter<boolean>()

  constructor(private fb: FormBuilder) {
    this.dataForm = this.fb.group({
      title: [''],
      contenido: ['']
    });

  }

  // icializa las variables del formulario
  ngOnInit(): void {
    this.dataForm.patchValue({
      title: this.datos.title,
      contenido: this.datos.contenido
    })
  }

  // cierra la pestaña de editar nota
  volver(): void {
    const valores = this.dataForm.value

    if (valores.contenido === this.datos.contenido && valores.title === this.datos.title) {
      this.cerrarNewNote.emit(false)
    } else {
      this.alert = true
    }
  }

  // respuesta del alert
  requestResponse(estado: boolean): void {
    if (estado) {
      console.log(estado)
      // Aqui se va a ejecutar para actualizar los datos
      this.alert = false
    } else {
      // si no quiere gusrdar solo cierra
      this.alert = false
      this.cerrarNewNote.emit(false)
    }
  }



  onSubmit(): void {

  }
}
