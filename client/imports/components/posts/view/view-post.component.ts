import { Component, Input } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscription } from 'rxjs';
import { Post } from 'imports/models/post';

@Component({
  selector: 'view-post',
  templateUrl: 'view-post.html',
  styleUrls: ['view-post.scss'],
  inputs: ['data']
})
export class ViewPostComponent {
  _id: string;

  @Input() data: Post;

  post: Observable<Post[]>;
  postSubscription: Subscription;

  ngOnInit() {/*
    this.postSubscription = MeteorObservable.subscribe('postCollection').subscribe(() => {
      
    })*/
  }
}