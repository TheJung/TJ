import { AuthHelper } from 'imports/util/auth/auth-helper';
import { LocalDatabase } from './../../../../../imports/util/db/localdb-helper';
import { Component, Input } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'new-thread',
  templateUrl: 'new-thread.html',
  styleUrls: ['new-thread.scss'],
  inputs: ['whenSubmitted', 'forumId']
})
export class NewThreadComponent {
  title: string;
  content: string;
  tags: Array<string>;

  @Input() whenSubmitted: (thread_id: Mongo.ObjectID) => void;
  

  constructor(private route: ActivatedRoute, private router: Router) { }

  async submit() {
    let account = new AuthHelper();
    let currentAccount = await account.currentState();

    const forumId = new Mongo.ObjectID(this.route.snapshot.paramMap.get('forum_id'));

    // forum: Mongo.ObjectID, title: string, content: string, author: Mongo.ObjectID, tags: Array<string>
    Meteor.call('thread.new', forumId, this.title, this.content, currentAccount.uid, this.tags, (err, res: Mongo.ObjectID) => {
      if (err !== undefined) {

      }

      this.router.navigateByUrl('topic/view/' + res.toHexString() + '/1');

      //this.whenSubmitted(res);
    });
  }
}