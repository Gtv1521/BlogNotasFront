import { Component, inject, Injectable } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import {
  MuestaReferidoComponent,
  Permisos,
} from '../../components/utils/muesta-referido/muesta-referido.component';
import { filter } from 'rxjs';
import {
  FormBuilder,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderSpinnerComponent } from '../../components/loader/loader-spinner/loader-spinner.component';
import { User } from '../../../domain/models/user.model';
import { ReferenceEntity } from '../../../domain/models/reference.model';
import { NotesUseCase } from '../../../aplication/use-cases/notes.use-case';

@Component({
  selector: 'app-compartir-note',
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    MuestaReferidoComponent,
    LoaderSpinnerComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './compartir-note.component.html',
  styleUrl: './compartir-note.component.scss',
})
export class CompartirNoteComponent {
  // constructor
  private fb = inject(FormBuilder); // cosntructor formularios
  private router = inject(Router); // acceso a las rutas
  private route = inject(ActivatedRoute);
  private note = inject(NotesUseCase);

  // estados
  listAdd: Permisos[] = []; // lista de usuarios add
  idNote!: string | null; // id de nota de la ruta
  nameNote: string = '';
  loadSearch: boolean = false; // activa carda en de data al buscar
  dataUser!: User[];
  listReferidos!: ReferenceEntity[];
  loader: boolean = false;
  load: boolean = false;

  // iconos
  faChevronLeft = faChevronLeft;

  // formulario data
  fomulario = this.fb.group({
    search: [''],
  });

  // se lanzaa con el inicio del componente
  ngOnInit(): void {
    this.idNote = `${this.route.snapshot.paramMap.get('nota')}`;
    this.note.load(this.idNote).subscribe({
      next: (res) => { 
        this.nameNote = res.title
      },
    });
  }

  // agregar los ussarios referidos a la lista
  response($event: [Permisos, boolean]) {
    const [permiso, selected] = $event;
    if (selected) {
      this.listAdd.push($event[0]);
    } else {
      const index = this.listAdd.findIndex((p) => p.idUSer === permiso.idUSer);
      if (index > -1) {
        this.listAdd.splice(index, 1);
      }
    }
  }

  // busca usuarios por el email
  search(): void {
    this.loadSearch = true;
    setTimeout(() => {
      this.loadSearch = false;
    }, 2000);
  }

  // guarda los referidos
  onSaveReferity(): void {}

  // elimina un referido
  onRemoveReferity(): void {}

  // regresa a la nota
  volver(): void {
    this.router.navigate([`note/${this.idNote}`]);
  }
}
