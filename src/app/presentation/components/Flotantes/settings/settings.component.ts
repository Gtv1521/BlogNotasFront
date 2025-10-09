import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  // iconos
  faCircleXmark = faCircleXmark

  private router = inject(Router);

  // vuelve a home 
  settings(): void {
    this.router.navigate(["/home"])
  }
}
