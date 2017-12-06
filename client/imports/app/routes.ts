import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';

import { Routes } from '@angular/router';
import { ViewTopicPage } from 'client/imports/pages/topic/view/view-topic.component';

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
  {
    path: 'forum/view/:id',
    component: HomeComponent
  },
  {
    path: 'topic/new',
    component: HomeComponent
  },
  {
    path: 'topic/view/:id/:page',
    component: ViewTopicPage
  },
  // 404 Page
  {
    path: '**',
    component: PageNotFoundComponent
  }
]