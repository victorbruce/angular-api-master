import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display-error',
  imports: [],
  templateUrl: './display-error.component.html',
  styleUrl: './display-error.component.scss',
})
export class DisplayErrorComponent {
  @Input() error: string | null = null;
}
