import { ActivatedRoute } from '@angular/router';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Component, Input, OnDestroy } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { MenuItem } from 'primeng/primeng';
import { ElementRef, ViewChild } from '@angular/core';
import { Post } from 'imports/models/post';
import { Threads } from 'imports/collections/threads';
import { Thread } from 'imports/models/thread';
import { Subscriber } from 'rxjs/Subscriber';
import { AuthHelper } from 'imports/util/auth/auth-helper';

@Component({
  selector: 'view-thread',
  templateUrl: 'view-thread.html',
  inputs: ['thread_id']
})
export class ViewThreadComponent implements OnDestroy {
  // attributes
  public thread_id: string;
  private on_page: string;

  // internal values
  private threadSubscription: Subscription;
  protected threadResult: ObservableCursor<Thread>;
  protected content: string = '';

  threadTitle: string;
  
  onForum: Mongo.ObjectID;

  constructor(private route: ActivatedRoute) {
    this.thread_id = this.route.snapshot.paramMap.get('topic_id');
    
    this.threadSubscription = MeteorObservable.subscribe('db.threads').subscribe(() => {
      this.threadResult = Threads.find({ _id: new Mongo.ObjectID(this.thread_id) });
      this.threadResult.forEach((elem: any) => {
        this.threadTitle = elem.root.title;
        this.onForum = elem.master;
      });
    });
  }

  ngOnInit() { }

  submit = async () => {
    let account = new AuthHelper();
    const accountState = await account.currentState();

    const thread = new Mongo.ObjectID(this.thread_id);

    // thread: Mongo.ObjectID, title: string, content: string, author: Mongo.ObjectID
    Meteor.call('post.new', thread, 'RE: ' + this.threadTitle, this.content, accountState.uid, (err, res) => {
      if (err !== undefined) {
        console.log(err);
      }
    });
      
    this.content = '';
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.threadSubscription.unsubscribe();
  }
}