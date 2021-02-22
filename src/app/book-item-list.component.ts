import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookItemService, BookItem } from './book-item.service';

@Component({
  selector: 'mw-book-item-list',
  templateUrl: './book-item-list.component.html',
  styleUrls: ['./book-item-list.component.css']
})
export class BookItemListComponent implements OnInit {
  type = '';
  bookItems: BookItem[];

  constructor(
    private bookItemService: BookItemService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(paramMap => {
        let type = paramMap.get('type');
        if (type.toLowerCase() === 'all') {
          type = '';
        }
        this.getBookItems(type);
      });
  }

  onBookItemDelete(bookItem: BookItem) {
    this.bookItemService.delete(bookItem)
      .subscribe(() => {
        this.getBookItems(this.type);
      });
  }

  getBookItems(type: string) {
    this.type = type;
    this.bookItemService.get(type)
      .subscribe(bookItems => {
        this.bookItems = bookItems;
      });
  }
}
