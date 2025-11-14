import { TestBed } from '@angular/core/testing';
import { NotificationHubService } from './notifications-hub.service';


describe('NotificationsHubService', () => {
  let service: NotificationHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
