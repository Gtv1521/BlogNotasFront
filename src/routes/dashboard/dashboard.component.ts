import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { forkJoin, timer } from 'rxjs';
import { BooksComponent } from '../../components/Dasboard/books/books.component';

@Component({
  selector: 'app-dashboard',
  imports: [LoaderComponent, BooksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: UsersService) { }

  loader: boolean = false
  id!: string;
  data: any = []
  error!: any

  // inicia todas las variables de carga por defaul 
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadData()
  }

  // trar los datos de la api para mostrarlos al usuario
  loadData() {
    this.loader = true
    forkJoin({
      apiData: this.router.requestUser(this.id),
      timer: timer(2500)
    }).subscribe({
      next: (response) => {
        this.loader = false
        this.data = response
      },
      error: (error) => {
        this.loader = false
        this.error = error 
      }      
    })
  }


}
