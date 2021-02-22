import { Routes, RouterModule } from '@angular/router';
import { BookItemListComponent } from './book-item-list.component';

const appRoutes: Routes = [
  {
    path: 'add',
    loadChildren: () => import('./new-item/new-item.module').then(m => m.NewItemModule)
  },
  { path: ':type', component: BookItemListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'all' }
];

export const routing = RouterModule.forRoot(appRoutes);
