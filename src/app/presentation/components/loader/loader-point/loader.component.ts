import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { BookUseCase } from '../../../../aplication/use-cases/book.use-case';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  // iconos
  faSpinner = faSpinner // icono de carga

  // inyecciones de servicios
  private router = inject(Router); // inyeccion del router
  private book = inject(BookUseCase); // servicio libretas
  private auth = inject(AuthService); // servicio session

  // al iniciar el componente
  ngOnInit(): any {
    // consulta todas las notas 
    this.book.loadAll(`${this.auth.getUserId()}`, 1); 
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
