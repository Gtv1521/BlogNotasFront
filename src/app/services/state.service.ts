import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  status: string = '';

  constructor() { }

  getStatus(): string {
    return this.status;
  }

  updateStatus() {
    this.status = 'active';
  }

  resetstatus() {
    this.status = '';
  }
}
