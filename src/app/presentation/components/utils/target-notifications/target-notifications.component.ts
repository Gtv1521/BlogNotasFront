import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationEvent } from '@app/domain/events/notificationEvent';
import { Notificacion } from '@app/domain/models/notification.model';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { sliderRigth } from '@app/presentation/animations/sliderDown';

@Component({
  selector: 'app-target-notifications',
  imports: [FaIconComponent],
  animations: [sliderRigth],
  templateUrl: './target-notifications.component.html',
  styleUrl: './target-notifications.component.scss',
})
export class TargetNotificationsComponent {

  @Input() datos!: NotificationEvent;
  @Output() salir = new EventEmitter<string>();

  faXmarkCircle = faXmarkCircle

  terminar(){
    this.salir.emit(this.datos.targetId);
  }
}
