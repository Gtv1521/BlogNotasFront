import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  faSpinner = faSpinner

  private router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
