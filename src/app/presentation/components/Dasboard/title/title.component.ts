import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faMagnifyingGlass, faRightFromBracket, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LogoutComponent } from "../logout/logout.component";
import { AuthService } from '../../../../../services/utils/Auth/auth.service';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [FontAwesomeModule, LogoutComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {

  // estados
  exit: boolean = false; // modal de salida 
  buscar: boolean = false; // panel de busqueda

  // icons
  close = faRightFromBracket // loggout
  search = faMagnifyingGlass // buscar
  faGears = faGears // configuraciones
  faSquareXmark = faSquareXmark // close  

  // Dependecies
  private auth = inject(AuthService)
  private router = inject(Router)

 //  abre panel de configuraciones
  goSetting(): void {
    this.router.navigate(['/settings']); // te envia a configuraciones
  }

  // se cambia el estado
  onToggleSearch(std: boolean): void {
    this.buscar = std; 
  }

  // Logout
  loguot(): void {
    this.exit = true
    timer(2000).pipe(

    ).subscribe(() => {
      this.auth.clearUserId()
      this.router.navigate(['/login'])
    });
  }
}
