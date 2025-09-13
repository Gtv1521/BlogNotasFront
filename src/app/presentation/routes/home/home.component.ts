import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterInicioComponent } from "../../components/footer-inicio/footer-inicio.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, FooterInicioComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
