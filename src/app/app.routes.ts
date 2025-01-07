import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/user-list/user-list.routes').then(m => m.USER_LIST_ROUTES), 
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user-details/user-details.routes').then(m => m.USER_DETAILS_ROUTES),
  },
];
