import { Meteor } from 'meteor/meteor';
import { Users } from 'imports/collections/users';

Meteor.publish('userMatch', (id: string, pw: string) => {
  return Users.find({
    id: id,
    pw: pw
  });
});