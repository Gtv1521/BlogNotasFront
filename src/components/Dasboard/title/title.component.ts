import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/utils/Auth/auth.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LogoutComponent } from "../logout/logout.component";

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

  // Dependecies
  private auth = inject(AuthService)
  private router = inject(Router)

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
