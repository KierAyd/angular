import { tag } from './tag';

export class Note {

    id: number;
    title: string;
    content: string;
    tag: tag | null;

  constructor(id: number, title: string, content: string, tag: tag | null = null) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.tag = tag;
  }

}
