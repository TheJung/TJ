import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnDestroy } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { MenuItem } from 'primeng/primeng';
import { ElementRef, ViewChild } from '@angular/core';
import { Post } from 'imports/models/post';
import { Threads } from 'imports/collections/threads';
import { Thread } from 'imports/models/thread';

@Component({
  selector: 'view-thread',
  templateUrl: 'view-thread.html',
  inputs: ['thread_id']
})
export class ViewThreadComponent implements OnDestroy {
  // attributes
  @Input() public thread_id: Mongo.ObjectID;
  private on_page: string;

  // internal values
  private threadSubscription: Subscription;
  protected threads: Observable<Thread[]>;
  protected content: string = '';

  ngOnInit() {
    this.threadSubscription = MeteorObservable.subscribe('db.threads').subscribe(async () => {
      this.threads = Threads.find({});
      console.log(await this.threads);
    });
  }

  submit: Function = async () => {
    // title: string, content: string, author: Mongo.ObjectID
    Meteor.call('post.new', 'TestTitle', this.content, null, (err, res) => {
      if (err) {
        console.log(err);
      }
      
      this.content = '';
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.threadSubscription.unsubscribe();
  }
}