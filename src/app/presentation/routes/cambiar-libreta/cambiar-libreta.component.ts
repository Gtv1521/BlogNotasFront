import { Component, HostListener, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faRightLong } from '@fortawesome/free-solid-svg-icons';
import { LoaderSpinnerComponent } from '../../components/loader/loader-spinner/loader-spinner.component';
import { AuthService } from '../../../../services/utils/Auth/auth.service';
import { BookEntity } from '../../../domain/models/noteBooks.model';
import { BookUseCase } from '../../../aplication/use-cases/book.use-case';
import { AsyncPipe } from '@angular/common';
import { TargetComponent } from '../../components/utils/target/target.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesUseCase } from '../../../aplication/use-cases/notes.use-case';
import { take } from 'rxjs';
import { RequestDeleteComponent } from '../../components/Flotantes/request-delete/request-delete.component';
import { LoadSaveComponent } from '../../components/Flotantes/load-save/load-save.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cambiar-libreta',
  imports: [
    FontAwesomeModule,
    AsyncPipe,
    LoaderSpinnerComponent,
    TargetComponent,
    RequestDeleteComponent,
    LoadSaveComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './cambiar-libreta.component.html',
  styleUrl: './cambiar-libreta.component.scss',
})
export class CambiarLibretaComponent {
  // iconos
  faChevronLeft = faChevronLeft; // volver
  faRightLong = faRightLong; // pasar note

  // estados
  libretaData: BookEntity[] = []; // libretas
  pagina: number = 1; // numero de pagina
  loader: boolean = false; // estado de inicio de data
  load: boolean = false; // estado de guardado
  idNote: string | null = ''; // id de la nota
  active: string = ''; // estado actica seleccionado
  title!: string; // titlulo de la nota
  bookName!: string; // nombre de la libreta
  idBook: string = ''; // id de libreta
  activeReq: boolean = false; // abre modal de pregunta
  onSave: boolean = false; // abre el modal de guardo

  // constructor
  private auth = inject(AuthService); // enlace a session
  private book = inject(BookUseCase); // enlace a libretas
  private note = inject(NotesUseCase); // accceso a notas
  private route = inject(ActivatedRoute); // enlace a los datos de la ruta
  private router = inject(Router); // enlace a rutas
  private fg = inject(FormBuilder);

  //idUsuario
  idUser: string = `${this.auth.getUserId()}`;

  // data formulario
  filtros = this.fg.group({
    filter: ['', [Validators.required]],
  });

  // consultas
  $book = this.book.book$; // data response
  $load = this.book.loading$; // estado de carga
  $err = this.book.errors$; // data error

  // inicio de component
  ngOnInit(): void {
    this.idNote = `${this.route.snapshot.paramMap.get('nota')}`;
    this.book.loadAll(this.idUser, this.pagina);
    this.note.load(this.idNote).subscribe({
      next: (res) => {
        this.title = res.title;
        this.idBook = `${res.idLibreta}`;
      },
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Calcular posición actual en la página
    const scrollPosition = window.scrollY + window.innerHeight;
    // Calcular altura total del documento
    const documentHeight = document.documentElement.scrollHeight;

    // PASO 5: Verificar si estamos cerca del final (100px antes)
    const isNearBottom = scrollPosition >= documentHeight - 100;

    if (isNearBottom && !this.$load) {
      this.loadMoreBooks();
    }
  }

  loadMoreBooks(): void {
    this.pagina += 1;
    this.book.loadAll(this.idUser, this.pagina);
  }

  // seleciona una llibreta para cambiarla nota
  onSelect(book: string): void {
    this.active = book;

    this.$book.pipe(take(1)).subscribe((books) => {
      const foundBook = books.find((item) => item.id === book);
      this.bookName = foundBook?.nameBook || 'No encontrado';
    });
  }

  // activa modal de pregunta si esta seguro
  onChangeNote(): void {
    this.activeReq = true;
  }

  response(estado: boolean): void {
    if (!estado) {
      this.activeReq = false;
    } else {
      this.activeReq = false;
      this.onSave = true;
      this.load = true;
      this.change();
    }
  }

  change(): void {
    this.note.changeBook(`${this.idNote}`, this.active).subscribe({
      next: (res) => {
        this.load = false;
        this.goHome();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // vuelve al inicio
  goHome(): void {
    setTimeout(() => {
      this.onSave = false;
      this.router.navigate(['/home']);
    }, 600);
  }

  // vuelve a la nota
  goNote(): void {
    this.router.navigate([`/note/${this.idNote}`]);
  }

  onSubmit(): void {
    if (this.filtros.valid) {
      const values = this.filtros.value;

      this.book.filter(`${values.filter}`, this.idUser);
    }else {
      this.book.loadAll(this.idUser, this.pagina);
    }
    // this.book.filter();
  }
}
