import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader-point/loader.component";
import { Router } from '@angular/router';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';

@Component({
  selector: 'app-wellcome',
  imports: [],
  standalone: true,
  templateUrl: '<div> </div>',
  styleUrl: './wellcome.component.scss'
})
export class WellcomeComponent {

  response: string = '';

  private router = inject(Router); // inyeccion del router
  private book = inject(BookUseCase); // inyeccion del servicio de libros
  private auth = inject(AuthService) // inyeccion del servicio de autenticacion
  
  ngOnInit() {
    this.book.insert({name: 'Mis notas', idUser: `${this.auth.getUserId()}`}).subscribe({
      next: (res) => {
        this.response = res;
        console.log(res);
        this.router.navigate(['/loader']); 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
