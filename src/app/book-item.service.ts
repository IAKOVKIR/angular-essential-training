import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookItemService {
  constructor(private http: HttpClient) {}

  get(type: string) {
    const getOptions = {
      params: { type }
    };
    return this.http.get<BookItemsResponse>('bookitems', getOptions)
      .pipe(
        map((response: BookItemsResponse) => {
          return response.bookItems;
        }),
        catchError(this.handleError)
      );
  }

  add(bookItem: BookItem) {
    return this.http.post('bookitems', bookItem)
      .pipe(
        catchError(this.handleError)
      );
  }

  delete(bookItem: BookItem) {
    return this.http.delete(`bookitems/${bookItem.id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('A data error occurred, please try again.');
  }
}

interface BookItemsResponse {
  bookItems: BookItem[];
}

export interface BookItem {
  id: number;
  name: string;
  author: string;
  type: string;
  genre: string;
  year: number;
  watchedOn: number;
  isFavorite: boolean;
}
