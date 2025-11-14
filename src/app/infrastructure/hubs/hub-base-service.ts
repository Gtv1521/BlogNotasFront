import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export abstract class HubBaseService {
  protected hubConnection!: signalR.HubConnection;

  protected createConnection(url: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, { withCredentials: true })
      .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
      .build();
  }

  async start() {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      try {
        await this.hubConnection.start();
        console.log('SignalR conectado.', this.hubConnection.state);
      } catch (err) {
        console.error('Error al conectar SignalR', err);
      }
    }
  }

  protected on<T>(eventName: string, callback: (data: T) => void) {
    this.hubConnection.on(eventName, callback);
  }

  async stopConnection() {
    if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
      await this.hubConnection.stop();
      console.log('Conexión detenida.');
    }
  }
}
