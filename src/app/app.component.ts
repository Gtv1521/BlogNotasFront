import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'services/utils/Auth/auth.service';
import { NotificationHubService } from './infrastructure/hubs/notifications-hub.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Notes';

  private auth = inject(AuthService);
  private signal = inject(NotificationHubService);
  ngOnInit() {
    if (this.auth.getUserId() !== null) {
      this.signal.OnConnect();
    }
  }
}
