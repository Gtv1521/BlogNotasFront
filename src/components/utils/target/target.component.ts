import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-target',
  standalone: true,
  imports: [],
  templateUrl: './target.component.html',
  styleUrl: './target.component.scss'
})
export class TargetComponent {

@Input() nombre!: string 

}
