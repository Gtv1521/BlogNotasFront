import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BooksComponent } from '../../components/Dasboard/books/books.component';
import { ListBooksComponent } from "../../components/list-books/list-books.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { switchMap, timer } from 'rxjs';
import { NewNotebookComponent } from '../../components/Flotantes/new-notebook/new-notebook.component';
import { SettingsComponent } from '../../components/Flotantes/settings/settings.component';
import { TitleComponent } from "../../components/Dasboard/title/title.component";
import { AuthService } from '../../services/utils/Auth/auth.service';
import { LogoutComponent } from "../../components/Dasboard/logout/logout.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SettingsComponent, LoaderComponent, BooksComponent, ListBooksComponent, FontAwesomeModule, NewNotebookComponent, TitleComponent, LogoutComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // estados 
  private id: string | null = null;
  idlibreta: string = ""
  loader: boolean = true
  modalNewNote: boolean = false
  modalSettings: boolean = false
  exit: boolean = false


  // Estados - menejo de datos
  datos: any = []
  errors: any = []

  // Llamado iconos
  faGears = faGears
  faPlus = faPlus
  faSquarePlus = faSquarePlus

  // inyeccion de dependencias
  private service = inject(UsersService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private auth = inject(AuthService)


  // se lanzan los requisitos para iniciar la app 
  ngOnInit(): void {

    //  Session
    if (this.auth.getToken() === null) {
      this.loader = false
      this.exit = true
      timer(2000).pipe(

      ).subscribe(() => {
        this.router.navigate(['/login'])
      });
    }

    // consukta de usuario 
    this.getIdUrl()

    timer(3000).pipe(
      switchMap(() => {
        if (this.id && typeof this.id === 'string') {
          return this.service.requestUser(this.id);
        } else {
          throw new Error('ID no disponible');
        }
      })
    ).subscribe({
      next: (response) => {
        this.datos = response;
        this.loader = false;
      },
      error: (err) => {
        this.errors = err;
        this.loader = false;
      }
    })
  }

  // trae el id de la ruta
  getIdUrl(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  // activa el modal new notebooks
  toggleModal(estado: boolean): void {
    this.modalNewNote = estado
  }

  // obtener idLibreta
  getLibreta(id: string): void {
    this.idlibreta = id
  }

  // settings
  settings(estado: boolean): void {
    this.modalSettings = estado
  }

  // cambia de ruta y crea una nueva nota
  newNote(): void {
    this.router.navigate(['/new_note'])
  }

  getUserId(): string | null {
    return this.id
  }

  logout(): void {
    this.exit = true
  }
}
