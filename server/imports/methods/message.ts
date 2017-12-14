import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Message, Chat } from 'imports/models/message';
import { Messages } from 'imports/collections/messages';
import { AuthHelper } from 'imports/util/auth/auth-helper';

Meteor.methods({
  'message.new': (groupMembers: Array<Mongo.ObjectID>) => {
    let uid = new Mongo.ObjectID;

    Messages.insert({
      _id: uid,
      member: groupMembers,
      chatHistory: new Array()
    });

    // make a new notification

    //

    return uid;
  },
  'message.send': (message: Mongo.ObjectID, sender: Mongo.ObjectID, text: string) => {
    const uid = new Mongo.ObjectID();

    let newMessage: Chat = {
      _id: new Mongo.ObjectID,
      sender: sender,
      content: text,
      createdAt: new Date()
    };
    
    Messages.update({
      _id: message
    }, {
      $push: {
        chatHistory: newMessage
      }
    });

    return uid;
  },

  'message.get.text': async (to: Mongo.ObjectID, from: Mongo.ObjectID) => {
    
  }
});