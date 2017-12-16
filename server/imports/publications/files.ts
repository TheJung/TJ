import { Files } from 'imports/lib/files/files';

Meteor.publish('files.all', function () {
  return Files.find().cursor;
});