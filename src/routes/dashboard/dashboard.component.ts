import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { HttpClient } from '@angular/common/http';
import { BooksComponent } from '../../components/Dasboard/books/books.component';
import { ListBooksComponent } from "../../components/list-books/list-books.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoaderComponent, BooksComponent, ListBooksComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  loader: boolean = false

  constructor(private http: HttpClient){}



}
