import { InjectionToken } from '@angular/core';

export const lookupListToken = new InjectionToken('lookupListToken');
export const lookupGenreListToken = new InjectionToken('lookupGenreListToken');

export const lookupLists = {
  types: ['Books', 'Comics']
};

export const lookupGenreLists = {
  genres: ['Novel', 'Fiction', 'Poetry', 'Biography', 'Drama', 'Mystery']
};
