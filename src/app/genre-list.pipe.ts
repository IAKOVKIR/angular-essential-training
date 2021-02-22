import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genreList'
})
export class GenreListPipe implements PipeTransform {
  transform(bookItems) {
    const genres = [];
    bookItems.forEach(bookItem => {
      if (genres.indexOf(bookItem.genre) <= -1) {
        genres.push(bookItem.genre);
      }
    });
    return genres;
  }
}
