import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { NoteComponent } from '../note/note.component';
import { Note } from '../note';

@Component({
  selector: 'app-pageprinc',
  standalone: true,
  imports: [CommonModule, NotesComponent, NoteComponent],
  templateUrl: './pageprinc.component.html',
  styleUrl: './pageprinc.component.css'
})
export class PageprincComponent {

  selectedNote: Note | null = null;

  onNoteSelected(note: Note): void {
    this.selectedNote = note;
  }

}
