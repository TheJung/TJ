import { Meteor } from 'meteor/meteor';
import { Forums } from 'imports/collections/forums';

Meteor.publish('db.forums', () => {
  return Forums.find({});
});

