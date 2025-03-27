import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BooksComponent } from '../../components/Dasboard/books/books.component';
import { ListBooksComponent } from "../../components/list-books/list-books.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faPlus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { NewNotebookComponent } from '../../components/Flotantes/new-notebook/new-notebook.component';
import { SettingsComponent } from '../../components/Flotantes/settings/settings.component';
import { TitleComponent } from "../../components/Dasboard/title/title.component";
import { AuthService } from '../../services/utils/Auth/auth.service';
import { LogoutComponent } from "../../components/Dasboard/logout/logout.component";
import { NewNoteComponent } from "../new-note/new-note.component";
import { NoteDataComponent } from "../../components/Dasboard/note-data/note-data.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SettingsComponent, LoaderComponent, BooksComponent, ListBooksComponent, FontAwesomeModule, NewNotebookComponent, TitleComponent, LogoutComponent, NewNoteComponent, NoteDataComponent],
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
  note: boolean = true
  title: string = 'Nueva Nota'
  contenido: string = 'Aqui es donde puedes escribir lo que piensas'

  // Estados - menejo de datos
  datos: any = []
  errors: any = []

  // Llamado iconos
  faGears = faGears
  faPlus = faPlus
  faSquarePlus = faSquarePlus

  // inyeccion de dependencias
  private router = inject(Router)
  private auth = inject(AuthService)


  // se lanzan los requisitos para iniciar la app 
  ngOnInit(): void {
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

  // trae el id de usuario
  getUserId(): string | null {
    return this.id
  }

  //  cierre de session
  logout(): void {
    this.loader = false
    this.exit = true
  }
}
