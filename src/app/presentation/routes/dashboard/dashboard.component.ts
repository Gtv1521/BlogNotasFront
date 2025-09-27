import { Component, Inject, inject } from '@angular/core';
import { BooksComponent } from '../../components/Dasboard/books/books.component';
import { ListBooksComponent } from "../../components/list-books/list-books.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp, faGears, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { timer } from 'rxjs';
import { TitleComponent } from "../../components/Dasboard/title/title.component";
import { LogoutComponent } from "../../components/Dasboard/logout/logout.component";
import { CacheService } from '../../../../services/utils/cache/cache.service';
import { AuthService } from '../../../../services/utils/Auth/auth.service';
import { NoteDataService } from '../../services/note.data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BooksComponent, ListBooksComponent, FontAwesomeModule, TitleComponent, LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // estados 
  private id: string | null = null;
  idlibreta: string = "";
  loader: boolean = true;
  modalNewNote: boolean = false;
  modalSettings: boolean = false;
  menuActive: boolean = false;
  exit: boolean = false;
  note: boolean = false;
  noteData: any = [];

  // Estados - menejo de datos
  datos: any = [];
  errors: any = [];

  // Llamado iconos
  faGears = faGears
  faPlus = faPlus
  faSquarePlus = faSquarePlus

  faChevronUp = faChevronUp; // flecha arriba
  faChevronDown = faChevronDown; // flecha abajo

  // inyeccion de dependencias
  private router = inject(Router);
  private auth = inject(AuthService);
  private cache = inject(CacheService);
  private noteService = inject(NoteDataService);


  // se lanzan los requisitos para iniciar la app 
  ngOnInit(): void {
    this.cache.clearAll()
    timer(3000).pipe().subscribe(() => {
      this.loader = false
    })

    //  Session
    if (localStorage.getItem('id') === null && this.auth.getUserId() === null) {
      this.logout()
      timer(2000).pipe().subscribe(() => {
        this.router.navigate(['/login'])
      });
    }

    this.id = this.auth.getUserId();
  }

  // // activa el modal new notebooks
  // toggleModal(estado: boolean): void {
  //   this.modalNewNote = estado
  // }

  // oculta o muestra el menu inferior
  toggleMenu(option: boolean): void {
    this.menuActive = !option;
  }

  // obtener idLibreta
  getLibreta(id: string): void {
    this.idlibreta = id
  }

  // trae el id de usuario
  getUserId(): string | null {
    return this.id
  }

  //  cierre de session
  logout(): void {
    this.loader = false
    this.exit = true
  }

  //  abre panel de configuraciones
  goSetting(): void {
    this.router.navigate(['/settings']); // te envia a configuraciones
  }

  // abre note nueva
  goNewNote(): void {
    this.router.navigate([`/new_note/${this.idlibreta}`]);
    this.noteService.setNote({ idLibreta: this.idlibreta, idNota: null });
  }

  // nueva libreta
  goNewBook(): void {
    this.router.navigate(['/new_book'])
  }

  // manda mensage para abrir una nota
  openNote(data: any): void {
    this.router.navigate([`/note/${data.idNote}`]);
    this.noteService.setNote({ idLibreta: data.idLibreta, idNota: data.idNote });
  }


}
