import { Component, inject } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  MuestaReferidoComponent,
  Permisos,
} from '../../components/utils/muesta-referido/muesta-referido.component';
import {
  FormBuilder,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderSpinnerComponent } from '../../components/loader/loader-spinner/loader-spinner.component';
import { User } from '../../../domain/models/user.model';
import {
  ReferenceEntity,
  ReferenceWithNoteEntity,
} from '../../../domain/models/reference.model';
import { NotesUseCase } from '../../../aplication/use-cases/notes.use-case';
import { UserUseCase } from '../../../aplication/use-cases/user.use-case';
import { ShareUseCase } from '@app/aplication/use-cases/share.use-case';
import { SessionUseCase } from '@app/aplication/use-cases/session.use-case';
import { AuthService } from 'services/utils/Auth/auth.service';
import { LoadSaveComponent } from '@app/presentation/components/Flotantes/load-save/load-save.component';
import { userDto } from '@app/aplication/dtos/user.dto';

@Component({
  selector: 'app-compartir-note',
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    MuestaReferidoComponent,
    LoaderSpinnerComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    LoadSaveComponent,
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
  private user = inject(UserUseCase);
  private share = inject(ShareUseCase);
  private session = inject(AuthService);

  // estados
  listAdd: Permisos[] = []; // lista de usuarios add
  idNote!: string | null; // id de nota de la ruta
  idLibreta!: string | null; // id de libreta de la nota
  iduser: string = `${this.session.getUserId()}`; // id del usuario actual
  nameNote: string = '';
  loadSearch: boolean = false; // activa carda en de data al buscar
  dataUser!: User[];
  listReferidos!: ReferenceWithNoteEntity[];
  loader: boolean = false;
  load: boolean = false;

  loadSave: boolean = false;
  loaderState: boolean = false;
  errores!: any;

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
        this.nameNote = res.title;
        this.idLibreta = res.idLibreta;
      },
    });

    this.loadReferences(this.idNote!);
  }

  loadReferences(id: string): void {
    this.share.loadAll(id, 1).subscribe({
      next: (res) => {
        this.listReferidos = res;
      },
      error: (err) => {
        this.errores = err;
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
    const values = `${this.fomulario.value.search}`;

    // console.log(values, 12);
    this.user.findByEmail(values).subscribe({
      next: (res) => {
        this.dataUser = res;
        this.loadSearch = false;
      },
      error: (err) => {
        this.errores = err;
        this.loadSearch = false;
      },
    });
  }

  referirUsuarios(): void {
    this.loadSave = true;
    this.loaderState = true;
    this.listAdd.forEach((permiso) => {
      const insert: ReferenceEntity = {
        id: '',
        idNote: this.idNote!,
        idLibreta: this.idLibreta!,
        idUser: this.iduser,
        idReference: permiso.idUSer,
        leer: permiso.leer,
        editar: permiso.editar,
      };

      this.onSaveReferity(insert);
    });

    this.loaderState = false;
    setTimeout(() => {
      this.loadSave = false;
    }, 600);
  }

  // guarda los referidos
  onSaveReferity(insert: ReferenceEntity): void {
    this.share.create(insert).subscribe({
      next: (res) => {
        this.loadReferences(this.idNote!);
        this.clearList(); // limpia la lista de agregados
      },
      error: (err) => {
        this.errores = err;
      },
    });
  }

  clearList(): void {
    this.listAdd = [];
  }

  // elimina un referido
  onRemoveReferity(): void {}

  //  bloquea los usuarios ya referidos
  isBlocked(userId: string): boolean {
    if (!this.listReferidos) {
      return false;
    }

    return !!this.listReferidos.find((e) => e.idReference === userId);

  }

  pasUser(item: userDto): User {
    return {
      id: item.idUser,
      name: item.name,
      role: item.role,
      email: item.email,
    };
  }

  // regresa a la nota
  volver(): void {
    this.router.navigate([`note/${this.idNote}`]);
  }
}
