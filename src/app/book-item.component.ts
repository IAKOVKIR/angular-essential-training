import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mw-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  @Input() bookItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.bookItem);
  }
}
