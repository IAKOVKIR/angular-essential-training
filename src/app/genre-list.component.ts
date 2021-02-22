import { Component, Input } from '@angular/core';

@Component({
  selector: 'mw-genre-list',
  template: `
    <span class="label" *ngFor="let genre of genres">
      {{ genre }}
    </span>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-bottom: 20px;
      }
      :host-context(.type-books) span {
        background-color: #53ace4;
      }
      :host-context(.type-comics) span {
        background-color: #45bf94;
      }
      span {
        display: inline-block;
        margin-right: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})
export class GenreListComponent {
  @Input() genres: string[];
}
