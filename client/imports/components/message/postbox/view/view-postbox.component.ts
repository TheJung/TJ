import { ActivatedRoute } from '@angular/router';
import { AuthHelper } from 'imports/util/auth/auth-helper';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'view-postbox',
  templateUrl: 'view-postbox.html'
})
export class ViewPostboxComponent {
  id: string;

  text;

  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
  }

  async send() {
    let account = new AuthHelper();
    let me = await account.currentUserInfo();

    // message: Mongo.ObjectID, sender: Mongo.ObjectID, text: string
    Meteor.call('message.send', new Mongo.ObjectID(this.id), me._id, this.text, (err, res) => {
      if (err !== undefined) {
        console.error(err);
      }

      console.log(res);
    });

    this.text = '';

  }
}