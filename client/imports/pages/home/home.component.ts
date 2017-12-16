import { Ground } from 'meteor/ground:db';
import { Component } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LocalDatabase } from 'imports/util/db/localdb-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomeComponent {
  db = new LocalDatabase('user');

  constructor(private router: Router) {}

  makeTestForum() {
    // subject: string, setting?: ForumSetting
    let req = new Promise((response, reject) => {
      Meteor.call('forum.new', '테스트', null, (err, res) => {
        if (err !== undefined) {
          reject(err);
        }

        response(res);
      });
    });

    req.then((forum_id: Mongo.ObjectID) => {
      this.router.navigateByUrl('/forum/view/' + forum_id.toHexString() + '/1');
    });
  }

  async test2() {
    console.log(await this.db.get('latest-signed'));
  }
} 