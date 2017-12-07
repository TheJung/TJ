import { Meteor } from 'meteor/meteor';
import { Users } from 'imports/collections/users';

Meteor.publish('db.user', () => {
  return Users.find({});
});