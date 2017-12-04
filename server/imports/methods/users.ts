import { Users } from 'imports/collections/users';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'signIn': (id: string, pw: string) => {
    Users.find({
      'id': id,
      'pw': pw
    });
  }
});