import { Component, inject, runInInjectionContext } from '@angular/core';
import { NotificationStore } from '@app/presentation/store/notification.store';
import { AuthService } from 'services/utils/Auth/auth.service';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

  private auth = inject(AuthService);
  private notify = inject(NotificationStore)

  notification$ = this.notify.notifications$;

}
