import { Injectable } from '@angular/core';
import { NotificationEvent } from '@app/domain/events/notificationEvent';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  private _notification = new BehaviorSubject<NotificationEvent[]>([]);
  notifications$ = this._notification.asObservable();

  private _count = new BehaviorSubject<number>(0);
  count$ = this._count.asObservable();

  add(event: NotificationEvent) {
    const current = this._notification.value;
    const cantidad = this._count.value;

    this._notification.next([...current, event]);
    this._count.next(cantidad + 1);

    console.log(this.notifications$);
  }

  markReadNotify(id: string) {
    var notify = this._notification.value.find((x) => x.targetId === id);
    notify?.IsRead === true;
  }

  removeNotify(id: string) {
    const filtered = this._notification.value.filter((b) => b.targetId !== id);
    this._notification.next(filtered);

    console.log(this.notifications$)
  }

  //  limpia la cuenta de las notificaciones
  clearCount() {
    this._count.next(0);
  }
}
