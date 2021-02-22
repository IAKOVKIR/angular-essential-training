import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private bookItems = [
    {
      id: 1,
      name: 'War and Peace',
      author: 'Leo Tolstoy',
      type: 'Books',
      genre: 'Novel',
      year: 2010,
      watchedOn: 1294166565384,
      isFavorite: false
    },
    {
      id: 2,
      name: 'Animal Farm',
      author: 'George Orwell',
      type: 'Books',
      genre: 'Fiction',
      year: 1945,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 3,
      name: 'Doctor Doom',
      author: 'Stan Lee',
      type: 'Comics',
      genre: 'Fiction',
      year: 2009,
      watchedOn: null,
      isFavorite: false
    }, {
      id: 4,
      name: 'Hamlet',
      author: 'William Shakespeare',
      type: 'Books',
      genre: 'Drama',
      year: null,
      watchedOn: null,
      isFavorite: true
    }, {
      id: 5,
      name: 'Dr Strange',
      author: 'Stan Lee',
      type: 'Comics',
      genre: 'Mystery',
      year: 2015,
      watchedOn: 1457166565384,
      isFavorite: false
    }
  ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('bookitems?type=') >= 0 || request.url === 'bookitems') {
            let type;
            if (request.urlWithParams.indexOf('?') >= 0) {
              type = request.urlWithParams.split('=')[1];
              if (type === 'undefined') { type = ''; }
            }
            let bookItems;
            if (type) {
              bookItems = this.bookItems.filter(i => i.type === type);
            } else {
              bookItems = this.bookItems;
            }
            responseOptions = {
              body: { bookItems: JSON.parse(JSON.stringify(bookItems)) },
              status: 200
            };
          } else {
            let bookItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            bookItems = this.bookItems.filter(i => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(bookItems[0])),
              status: 200
            };
          }
          break;
        case 'POST':
          const bookItem = request.body;
          bookItem.id = this._getNewId();
          this.bookItems.push(bookItem);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteBookItem(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deleteBookItem(id) {
    const bookItem = this.bookItems.find(i => i.id === id);
    const index = this.bookItems.indexOf(bookItem);
    if (index >= 0) {
      this.bookItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.bookItems.length > 0) {
      return Math.max.apply(Math, this.bookItems.map(bookItem => bookItem.id)) + 1;
    } else {
      return 1;
    }
  }
}
