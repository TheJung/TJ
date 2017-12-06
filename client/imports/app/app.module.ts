import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  ButtonModule,
  MenubarModule,
  InputTextareaModule,
  SplitButtonModule
} from 'primeng/primeng';

import { AppComponent } from './app.component';

// Pages
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';
import { SignUpComponent } from '../pages/user/sign-up/sign-up.component';
import { ViewTopicPage } from '../pages/topic/view/view-topic.component';

// Components
import { ViewPostComponent } from '../components/posts/view/view-post.component';
import { NewPostComponent } from './../components/posts/new/new-post.component';
import { NewThreadComponent } from '../components/thread/new/new-thread.component';
import { LoginBoxComponent } from '../components/login-box/view/login-box.component';
import { ViewThreadComponent } from '../components/thread/view/view-thread.component';

// Settings
import { RouteSetting } from './routes';
import { ViewTopicListComponent } from '../components/topic-list/view/view-topic-list.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(RouteSetting),
    ButtonModule,
    MenubarModule,
    InputTextareaModule,
    SplitButtonModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ViewPostComponent,
    NewPostComponent,
    SignUpComponent,
    NewThreadComponent,
    ViewThreadComponent,
    ViewTopicPage,
    LoginBoxComponent,
    PageNotFoundComponent,
    ViewTopicListComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
