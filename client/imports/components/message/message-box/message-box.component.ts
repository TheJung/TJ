import { AuthHelper } from 'imports/util/auth/auth-helper';
import { Component, Input, OnInit } from "@angular/core";
import { Message } from 'imports/models/message';
import { ObservableCursor, MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Messages } from 'imports/collections/messages';

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html',
  styleUrls: ['message-box.scss']
})
export class MessageBoxComponent implements OnInit {
  @Input() messageId: string;

  account: AuthHelper;
  user;

  messages: Message[];

  messagesCollection: ObservableCursor<Message>;
  messageSubscription: Subscription;

  constructor() {
    this.account = new AuthHelper();
  }

  async ngOnInit() {
    this.user = await this.account.currentUserInfo();


    let messageUid = new Mongo.ObjectID(this.messageId);
    console.log(messageUid);

    this.messageSubscription = MeteorObservable.subscribe('messages.all').subscribe(() => {
      this.messagesCollection = Messages.find({ _id: messageUid });

      console.log(this.messagesCollection.fetch());
    });
  }

}