import { Meteor } from 'meteor/meteor';
import { Threads } from 'imports/collections/threads';

Meteor.publish('threadCollection', () => {
  return Threads.find({});
});