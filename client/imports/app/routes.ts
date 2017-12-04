import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';

import { Routes } from '@angular/router';

export let RouteSetting: Routes = [
  // Home Page
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // 404 Page
  {
    path: '**',
    component: PageNotFoundComponent
  }
]