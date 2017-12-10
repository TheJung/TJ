import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';

import { Routes } from '@angular/router';
import { ViewTopicPage } from 'client/imports/pages/topic/view/view-topic.component';
import { AuthPage } from 'client/imports/pages/user/auth/auth.component';
import { NewTopicPage } from '../pages/topic/new/new-topic.component';
import { ViewForumPage } from 'client/imports/pages/forum/view/view-forum.component';

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
    path: 'forum/view/:forum_id/:page',
    component: ViewForumPage
  },
  {
    path: 'topic/new/:forum_id',
    component: NewTopicPage
  },
  {
    path: 'topic/view/:topic_id/:page',
    component: ViewTopicPage
  },

  // auth pages
  {
    path: 'auth',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/:page',
    component: AuthPage
  },
  // 404 Page
  {
    path: '**',
    component: PageNotFoundComponent
  }
]