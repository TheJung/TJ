import { Notifications } from 'imports/collections/notifications';
import { Meteor } from 'meteor/meteor';

Meteor.publish('db.notification', () => {
  return Notifications.find({});
});

