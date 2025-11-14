import { Injectable } from '@angular/core';
import { NotificationEvent } from '@app/domain/events/notificationEvent';
import { NotificationStore } from '@app/presentation/store/notification.store';

@Injectable({ providedIn: 'root' })
export class OnNotification {
  constructor(private store: NotificationStore) {}

  execute(event: NotificationEvent) {
    this.store.add(event);
  }
}

export class MarkReadNotification {
    constructor(private store: NotificationStore){}

    execute(id: string){
        this.store.markReadNotify(id);
    }
}
