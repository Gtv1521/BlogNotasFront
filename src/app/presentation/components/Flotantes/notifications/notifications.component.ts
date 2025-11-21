import { Component, inject, Input } from '@angular/core';
import { NotificationStore } from '@app/presentation/store/notification.store';
import { faBroom, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'services/utils/Auth/auth.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { slideAnimation } from '@app/presentation/animations/sliderDown';

@Component({
  selector: 'app-notifications',
  imports: [FaIconComponent],
  animations: [slideAnimation],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {

  // icons
  faBroom = faBroom; // clean
  faTrashArrowUp = faTrashArrowUp; // delete

  // states
  onClear: boolean = false;
  onDelete: boolean = false;

  private auth = inject(AuthService);
  private notify = inject(NotificationStore);

  notification$ = this.notify.notifications$;


  ngOnInit() {
    this.notify.clearCount();
  }

  initDelete(): void {
    this.onClear = false;
    this.onDelete = !this.onDelete;
  }
}
