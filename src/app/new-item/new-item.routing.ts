import { Routes, RouterModule } from '@angular/router';
import { BookItemFormComponent } from './book-item-form.component';

const newItemRoutes: Routes = [
  { path: '', component: BookItemFormComponent }
];

export const newItemRouting = RouterModule.forChild(newItemRoutes);
