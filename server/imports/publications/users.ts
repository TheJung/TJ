import { Meteor } from 'meteor/meteor';
import { Users } from 'imports/collections/users';

Meteor.publish('db.users.no-password', () => {
  return Users.find({}, {
    fields: {
      password: 0
    }
  });
});