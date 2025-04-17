import { Component,input,Output,EventEmitter,SimpleChanges,signal,WritableSignal } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {

  id = input<number>(0);
  name = input<string>('Default tag name');
  color = input<string>('#000000');
}
