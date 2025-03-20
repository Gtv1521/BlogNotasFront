import { Component } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { BooksComponent } from '../../components/Dasboard/books/books.component';
import { ListBooksComponent } from "../../components/list-books/list-books.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { switchMap, timer } from 'rxjs';
import { NewNotebookComponent } from '../../components/Flotantes/new-notebook/new-notebook.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoaderComponent, BooksComponent, ListBooksComponent, FontAwesomeModule, NewNotebookComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // estados 
  id: string | null = ""
  idlibreta: string = ""
  loader: boolean = true
  modal: boolean = false

  // Estados - menejo de datos
  datos: any = []
  errors: any = []

  // Llamado iconos
  faGears = faGears
  faPlus = faPlus

  constructor(
    private service: UsersService,
    private route: ActivatedRoute
  ) { }


  // se lanzan los requisitos para iniciar la app 
  ngOnInit(): void {

    // ver session 

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
  toggleModal(stado: boolean): void {
    this.modal = stado
  }

  // obtener idLibreta
  getLibreta(id: string): void {
    this.idlibreta = id
  }


}
