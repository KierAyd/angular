import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
import { tag } from '../tag';
import { TagComponent } from '../tag/tag.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [TagComponent, FormsModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
}) 
export class TagsComponent 
{
  loaded: boolean = false;
  tags: tag[] = [];

  editing: tag | null = null;

  constructor(private storageService:StorageService) {}
  
  ngOnInit(): void 
  {
    this.loadTags();
  }

  loadTags(): void {
    if (!this.loaded) {
      this.storageService.getTags().subscribe((tags: tag[]) => {
        this.tags = tags;
        this.loaded = true;
      });
    }
  }

  private generateColor(): string
  {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
  }
/*
  dialogAddTag(event: Event): boolean 
  {
      const tagName = window.prompt("Entrez le nom du tag :");
      if (tagName && tagName.trim()) {
        const newTag: tag = {
          id: Math.floor(Math.random() * 1677721548),
          name: tagName.trim(),
          color: this.generateColor()
        };
        this.storageService.createTag(newTag);
        this.tags.push(newTag);
      }
    return false;
  }
  */
  deleteTag(t: tag): void 
  {
    this.storageService.deleteTag(t.id);
    this.tags = this.tags.filter(tag => tag.id !== t.id);
  }


  dialogEditTag(event: Event): boolean {
    event.preventDefault();
    this.editing = { id: 0, name: '', color: '' };
    return false;
  }



  cancelEditing(): void {
    this.editing = null;
  }



  dialogModifyTag(t: tag, event: Event): boolean {
    event.preventDefault();
    this.editing = { ...t };
    return false;
  }


  
   onSubmitForm(): void 
  {
    if (!this.editing) return;
    if (this.editing.name.trim() === '') 
    {
      return;
    }
    const tagColor = this.editing.color.trim() === '' ? '#000000' : this.editing.color.trim();    
    if (this.editing.id === 0) 
    {
      const newTag: tag = 
      {
        id: Math.floor(Math.random() * 1677721548),
        name: this.editing.name.trim(),
        color: tagColor,
      };
      this.storageService.createTag(newTag);
    } else 
    {
      const idx = this.tags.findIndex(t => t.id === this.editing!.id);
      if (idx !== -1) 
        {
        const updatedTag: tag = 
        {
          ...this.tags[idx],
          name: this.editing.name.trim(),
          color: tagColor,
        };
        this.tags[idx] = updatedTag;
        this.storageService.updateTag(updatedTag);
      }
    }
    this.editing = null;
  }
}

