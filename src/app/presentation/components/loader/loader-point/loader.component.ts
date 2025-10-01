import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

  // al iniciar el componente
  ngOnInit(): any {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
