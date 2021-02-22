import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookItemComponent } from './book-item.component';
import { BookItemListComponent } from './book-item-list.component';
import { FavoriteDirective } from './favorite.directive';
import { GenreListPipe } from './genre-list.pipe';
import { lookupListToken, lookupLists, lookupGenreListToken, lookupGenreLists } from './providers';
import { MockXHRBackend } from './mock-xhr-backend';
import { routing } from './app.routing';
import { GenreListComponent } from './genre-list.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    BookItemComponent,
    BookItemListComponent,
    GenreListComponent,
    FavoriteDirective,
    GenreListPipe
  ],
  providers: [
    { provide: lookupListToken, useValue: lookupLists },
    { provide: lookupGenreListToken, useValue: lookupGenreLists },
    { provide: HttpXhrBackend, useClass: MockXHRBackend }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
