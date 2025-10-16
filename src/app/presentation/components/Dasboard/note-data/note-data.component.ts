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
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDataService } from '../../../services/note.data.service';
import { OptionsComponent } from "../../Flotantes/options/options.component";
import { RequestDeleteComponent } from "../../Flotantes/request-delete/request-delete.component";

@Component({
  selector: 'app-note-data',
  standalone: true,
  imports: [DatePipe, FontAwesomeModule, ReactiveFormsModule, RequestAlertComponent, LoaderSpinnerComponent, LoadSaveComponent, OptionsComponent, RequestDeleteComponent],
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
  options: boolean = false; // abre opciones de nota
  load: boolean = false; // estado para modales de carga
  saveLoader: boolean = false;
  doneSave: boolean = false;
  data: NoteEntity | null = null; // recibe datos de actualizacion 
  errors: any = '';
  responses: string | boolean = false;
  reqDelete: boolean = false; // muestra panel de seguro borrar 
  Request: string = 'Quiere guardar antes de salir ?';

  // Entradas en el constructor
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
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
    this.getDataNote();
    this.loader = true;
    this.getNote();
  }

  // llama los datos de la ruta
  getDataNote(): void {
    const response = this.noteService.getNote();

    if (response.idNota === null) {
      this.idNota = response.idNota
      this.idLibreta = this.route.snapshot.paramMap.get('libreta')!;
    } else {
      this.idNota = this.route.snapshot.paramMap.get('id')!;
      this.idLibreta = response.idLibreta;
    }
  }

  // Llama los datos para 
  getNote(): void {
    if (this.idNota !== null) {
      // datos de nota creada
      this.service.load(`${this.idNota}`).subscribe({
        next: (res) => {
          this.data = res;
          this.llenar();
          this.loader = false;
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

  // abre opciones
  openClose(): void {
    this.options = !this.options;
  }

  // respuesta del alert
  requestResponse(estado: boolean): void {
    if (estado) {
      this.save(this.idNota);
      this.load = true;
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
      if (this.load === false) this.goHome(); else this.closeAlert();
    }, 1000)
  }

  // salida al home
  goHome(): void {
    this.router.navigate(['/home'])
  }

  // espera para cambiar el estado de guardado
  spinnerDone(): void {
    setTimeout(() => {
      this.doneSave = false;
    }, 700);
  }

  // abre / cierra modal de delete
  onDelete(): void {
    this.openClose(); // cierra el modal de opciones
    this.reqDelete = !this.reqDelete;
  }

  delete(estado: boolean): void {
    if (!estado) {
      this.reqDelete = false; // cierra modal confDelete
    }
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

    this.service.createNote(dataInsert).subscribe({
      next: (res) => {
        this.responses = res;
        this.loader = false; // termina la carga de la nota nueva
        this.closeAlert(); // cierra el modulo de notas 
        this.service.allNotesByBook(`${dataInsert.idBook}`, 1); // refresca las notas 
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
    this.load = true;
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
        this.service.allNotesByBook(`${dataUpdate.idBook}`, 1); // refresca las notas
        this.getNote(); // se carga la nota de nuevo
        this.load = false;
        this.spinnerDone(); // cierra el spinner
      },
      error: (err) => {
        this.errors = err;
      }
    });
  }
}
