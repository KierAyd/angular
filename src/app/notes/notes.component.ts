import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../storage.service';
import { Note } from '../note';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tag } from '../tag';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  loaded: boolean = false;
  notes: Note[] = [];
  editing: Note | null = null;
  availableTags: tag[] = [];

  searchTerm: string = '';

  @Output() noteSelected = new EventEmitter<Note>();

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
    this.loadTags();
  }

  loadTags(): void {
    this.storageService.getTags().subscribe((tags: tag[]) => {
      this.availableTags = tags;
    });
  }

  loadNotes(): void {
    if (!this.loaded) {
      this.storageService.getNotes().subscribe((notes: Note[]) => {
        this.notes = notes;
        this.loaded = true;
      });
    }
  }


  dialogCreateNote(event: Event): boolean {
    event.preventDefault();
    this.editing = { id: 0, title: '', content: '', tag: null };
    return false;
  }


  deleteNote(n: Note, event: Event): void {
    event.stopPropagation();
    this.storageService.deleteNote(n.id);
    this.notes = this.notes.filter(note => note.id !== n.id);
  }

  selectNote(n: Note, event: Event): void {
    event.preventDefault();
    this.noteSelected.emit(n);
  }


  dialogModifyNote(n: Note, event: Event): boolean {
    event.preventDefault();
    this.editing = { ...n };
    return false;
  }


  cancelEditing(): void {
    this.editing = null;
  }

  onSubmitForm(): void 
  {
    if (!this.editing) return;
    if (this.editing.title.trim() === '') return; 
    if (this.editing.id === 0) 
    {
      const newNote: Note = 
      {
        id: Math.floor(Math.random() * 1000000),
        title: this.editing.title.trim(),
        content: this.editing.content.trim(),
        tag: this.editing.tag
      };
      this.storageService.createNote(newNote);
    } else 
    {
      const idx = this.notes.findIndex(n => n.id === this.editing!.id);
      if (idx !== -1) 
      {
        const updatedNote: Note = 
        {
          ...this.notes[idx],
          title: this.editing.title.trim(),
          content: this.editing.content.trim(),
          tag: this.editing.tag
        };
        this.notes[idx] = updatedNote;
        this.storageService.updateNote(updatedNote);
      }
    }
    this.editing = null;
  }


  get filteredNotes(): Note[] 
  {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) 
    {
      return this.notes;
    }
    return this.notes.filter(n =>
      n.title.toLowerCase().includes(term)
    );
  }

}


