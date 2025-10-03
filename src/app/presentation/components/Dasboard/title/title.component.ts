import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGears, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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
  exit: boolean = false

  // icons
  close = faRightFromBracket
  search = faMagnifyingGlass
  faGears = faGears // configuraciones

  // Dependecies
  private auth = inject(AuthService)
  private router = inject(Router)

 //  abre panel de configuraciones
  goSetting(): void {
    this.router.navigate(['/settings']); // te envia a configuraciones
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
