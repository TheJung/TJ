import { AuthHelper } from 'imports/util/auth/auth-helper';
import { Component } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Notifications } from 'imports/collections/notifications';

@Component({
  selector: 'notifier',
  templateUrl: 'notifier.html'
})
export class NotifierComponent {

  notis;

  constructor(private user: AuthHelper) {
    user = new AuthHelper();
    let me = user.currentUserInfo();

    me.then((result) => {
      MeteorObservable.subscribe('db.notification').subscribe(() => {
        this.notis = Notifications.find({ receiver: result._id });

        console.log(this.notis.fetch());
      });
    });
  }
}