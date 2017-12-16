import { Notifications } from 'imports/collections/notifications';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'notification.register': (where: string, sender: Mongo.ObjectID, receiver: Mongo.ObjectID, contents: any) => {
    let uid = new Mongo.ObjectID();

    Notifications.insert({
      _id: uid,
      fromWhere: where,
      sender: sender,
      contents: contents,
      receiver: receiver,
      viewed: false
    });

    return uid;
  },
  'notification.check': (noti: Mongo.ObjectID) => {
    Notifications.update({
      _id: noti
    }, {
      viewed: true
    });
  }
});