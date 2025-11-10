import { Injectable } from '@angular/core';
import { Notificacion } from '@app/domain/models/notification.model';
import { environment } from '@environments/environments';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationsHubService {
  private hubConnection: signalR.HubConnection;
  private Hub = `${environment.hubUrl}/notificationHub`;
  private isConnected = new BehaviorSubject<boolean>(false);
  private newNotification = new BehaviorSubject<Notificacion | null>(null);
  private notificationCount = new BehaviorSubject<number>(0);

  // Observables públicos
  public connectionStatus$ = this.isConnected.asObservable();
  public notificationReceived$ = this.newNotification.asObservable();
  public unreadCount$ = this.notificationCount.asObservable();

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.Hub}`, {
        withCredentials: true,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000]) // reintentos
      .build();
  }

  // se inicia la conexion con el canal
  public startConnection(): Promise<void> {
    return this.hubConnection
      .start()
      .then(() => {
        console.log('✅ Conectado al Hub de notificaciones');
        this.isConnected.next(true);

        return this.hubConnection.invoke('SubscribeToNotifications');
      })
      .catch((err) => {
        console.error('❌ Error conectando al Hub:', err);
        this.isConnected.next(false);
        throw err;
      });
  }

  private setupHubEvents(): void {
    this.hubConnection.on(
      'ReceiveNotifications',
      (notification: Notificacion) => {
        console.log('Notificacion recibida', notification);
        this.newNotification.next(notification);
        this.incrementNotificarionsCount();
        this.showBrowserNotification(notification);
      }
    );

    // confimacion de conexion
    this.hubConnection.on('ConnectionEstablished', (userId: string) => {
      console.log(`✅ Suscripción confirmada para: ${userId}`);
    });

    this.hubConnection.on('SubscriptionConfirmed', (userId: string) => {
      console.log(`✅ Suscripción confirmada para: ${userId}`);
    });

    // manejo de reconexion
    this.hubConnection.onreconnected(() => {
      console.log('🔁 Reconectado al Hub');
      this.isConnected.next(true);
    });

    this.hubConnection.onclose(() => {
      console.log('🔌 Conexión cerrada');
      this.isConnected.next(false);
    });
  }

  // marca notificacion como leida
  public markAsRead(idNotification: string): Promise<void> {
    return this.hubConnection.invoke('MarkAsRead', idNotification);
  }

  showBrowserNotification(notificacion: Notificacion): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(notificacion.title, {
          body: notificacion.message,
          icon: '/assets/icons/note.png',
          tag: notificacion.id,
        });
      } else if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(notificacion.title, {
              body: notificacion.message,
              icon: '/assets/icons/note.png',
            });
          }
        });
      }
    }
  }

  incrementNotificarionsCount() {
    this.notificationCount.next(this.notificationCount.value + 1);
  }

  // Detener conexión
  public stopConnection(): Promise<void> {
    return this.hubConnection.stop();
  }
}
