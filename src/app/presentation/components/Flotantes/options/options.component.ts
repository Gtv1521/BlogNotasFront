import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { faCodeCompare, faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options',
  imports: [FontAwesomeModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent {

  // estados del padre
  @Input() idNote!: string | null;
  @Output() openClose = new EventEmitter<void>();
  @Output() deleteOn = new EventEmitter<boolean>();

  // contructor
  private router = inject(Router);

  // Iconos
  faTrash = faTrash
  faLink = faLink
  faCodeCompare = faCodeCompare


  closeOption(): void {
    this.openClose.emit();
  }

  deleteOk(): void {
    this.deleteOn.emit(true);
  }

  goChangeBook(): void {
    this.router.navigate([`/change_lib/${this.idNote}`])
  }

  goCompartirNote(): void {
     this.router.navigate([`/compartir/${this.idNote}`])
  }

}
