import { Meteor } from 'meteor/meteor';
import { Threads } from 'imports/collections/threads';

Meteor.publish('db.threads', () => {
  return Threads.find({});
});