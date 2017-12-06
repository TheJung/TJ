import { Users } from 'imports/collections/users';
import { Meteor } from 'meteor/meteor';


Meteor.methods({
  'signIn': (id: string, pw: string) => {
    Users.find({
      'id': id,
      'password': pw
    });
  },
  'signUp': (id: string, pw: string, nick: string) => {
    Users.insert({
      'id': id,
      'password': pw,
      'nickname': nick,
      isAdmin: false
    });
  }
});