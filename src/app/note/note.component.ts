import { Component,input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  id = input<number>(0);
  title = input<string>('');
  content = input<string>('');
  tag = input<string | null>(null);
}
