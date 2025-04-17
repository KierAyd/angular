import { Injectable } from '@angular/core';
import { tag } from './tag';
import { Observable, of } from 'rxjs';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class StorageService 
{
  private localStorageKey = 'myTags';
  private tags: tag[] = [];

  private localStorageKeyNotes = 'myNotes';
  private notes: Note[] = [];

  constructor() 
  {
    this.loadTags();
    this.loadNotes();
  }

  createTag(newTag: tag): void 
  {
    this.tags.push(newTag);
    this.saveTags();
  }

  private loadTags(): void 
  {
    if (typeof localStorage !== 'undefined') 
    {
      const stored = localStorage.getItem(this.localStorageKey);
      if (stored) 
      {
        this.tags = JSON.parse(stored);
      }
    }
  }

  getTags(): Observable<tag[]> 
  {
    return of(this.tags);
  }

  deleteTag(tagId: number): void 
  {
    this.tags = this.tags.filter(tag => tag.id !== tagId);
    this.saveTags();
  }

  private saveTags(): void 
  {
    if (typeof localStorage !== 'undefined') 
    {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.tags));
    }
  }

  updateTag(updatedTag: tag): void {
    const index = this.tags.findIndex(t => t.id === updatedTag.id);
    if (index >= 0) {
      this.tags[index] = updatedTag;
      this.saveTags();
    }
  }




  private loadNotes(): void {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(this.localStorageKeyNotes);
      if (stored) {
        this.notes = JSON.parse(stored);
      }
    }
  }

  createNote(newNote: Note): void {
    this.notes.push(newNote);
    this.saveNotes();
  }

  getNotes(): Observable<Note[]> {
    return of(this.notes);
  }

  deleteNote(noteId: number): void {
    this.notes = this.notes.filter(note => note.id !== noteId);
    this.saveNotes();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex(n => n.id === updatedNote.id);
    if (index >= 0) {
      this.notes[index] = updatedNote;
      this.saveNotes();
    }
  }

  private saveNotes(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageKeyNotes, JSON.stringify(this.notes));
    }
  }
}