import { Thread } from 'imports/models/thread';
import { Forum } from 'imports/models/forum';
import { Threads } from 'imports/collections/threads';
import { Forums } from 'imports/collections/forums';
import { Router } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Mongo } from 'meteor/mongo';
import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'view-topics-list',
  templateUrl: 'view-topics-list.html',
  styleUrls: ['view-topics-list.scss'],
  inputs: ['forum_id']
})
export class ViewTopicListComponent implements OnInit, OnDestroy {
  @Input() forum_id: string;

  currentInForum: Forum;
  forumSubscription: Subscription;

  all_threads: Observable<Thread[]>;
  threadsSubscription: Subscription;

  not_exists: Boolean;

  constructor(private router: Router) { }

  open(_id: Mongo.ObjectID) {
    this.router.navigateByUrl('/topic/view/' + _id + '/1');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    const currentForum = new Mongo.ObjectID(this.forum_id);
    
    Meteor.call('forum.exists', currentForum, (err, res) => {
      this.not_exists = !res;
    });

    this.forumSubscription = MeteorObservable.subscribe('db.forums').subscribe(() => {
      this.currentInForum = Forums.findOne({ _id: this.forum_id });
    });

    this.threadsSubscription = MeteorObservable.subscribe('db.threads').subscribe(async () => {
      this.all_threads = Threads.find({ master: currentForum });
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.forumSubscription.unsubscribe();
    this.threadsSubscription.unsubscribe();
  }
}