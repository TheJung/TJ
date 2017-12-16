import { AuthHelper } from './../../../../../../imports/util/auth/auth-helper';
import { MeteorObservable, ObservableCursor } from 'meteor-rxjs';
import { Component, OnInit } from "@angular/core";
import { Message } from 'imports/models/message';
import { Subscription } from 'rxjs/Subscription';
import { Messages } from 'imports/collections/messages';

@Component({
  selector: 'list-messages',
  templateUrl: 'list-messages.html'
})
export class ListMessagesComponent implements OnInit {

  messagesCollection: ObservableCursor<Message>;
  messagesSubscription: Subscription;

  async ngOnInit() {
    let account = new AuthHelper();
    let user = await account.currentUserInfo();

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.messagesSubscription = MeteorObservable.subscribe('messages.all').subscribe(() => {
      this.messagesCollection = Messages.find({
        $or: [
          { from: user._id },
          { to: user._id }
        ]
      }, {
        fields: {
          
        }
      });

      console.log(this.messagesCollection.fetch());
    });
  }
}