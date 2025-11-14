import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faCircleHalfStroke,
  faCircleUser,
  faGears,
  faMagnifyingGlass,
  faRightFromBracket,
  faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../../../../services/utils/Auth/auth.service';
import { NotificationStore } from '@app/presentation/store/notification.store';
import { AsyncPipe } from '@angular/common';
import { NotificationsComponent } from "../../Flotantes/notifications/notifications.component";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [FontAwesomeModule, LogoutComponent, AsyncPipe, NotificationsComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  // estados
  exit: boolean = false; // modal de salida
  buscar: boolean = false; // panel de busqueda
  UserSettings: boolean = false; // abre panel de usuario
  openNotify: boolean = false; // abre panel de notificaciones

  // icons
  close = faRightFromBracket; // loggout
  search = faMagnifyingGlass; // buscar
  faGears = faGears; // configuraciones
  faSquareXmark = faSquareXmark; // close
  faBell = faBell; // campana notifications
  faCircleUser = faCircleUser; // icono usuario
  faCircleHalfStroke = faCircleHalfStroke; // icono theme

  // Dependecies
  private router = inject(Router);
  private auth = inject(AuthService);
  private notify = inject(NotificationStore);

  count$ = this.notify.count$;

  //  abre panel de configuraciones
  goSetting(): void {
    this.router.navigate(['/settings']); // te envia a configuraciones
  }

  // se cambia el estado
  onToggleSearch(std: boolean): void {
    this.buscar = std;
  }

  resetCountNotify() {
    this.notify.clearCount();
  }

  // abre / cierra las notificaciones
  openNotifications() {
    this.openNotify = !this.openNotify;
  }

  goPanelUser() {
    this.UserSettings = !this.UserSettings;
  }

  // Logout
  loguot(): void {
    this.UserSettings = false;
    this.exit = true;
    timer(2000).subscribe(() => {
      this.auth.clearUser();
      this.router.navigate(['/login']);
    });
  }
}
