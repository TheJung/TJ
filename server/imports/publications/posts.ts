import { Meteor } from 'meteor/meteor';
import { Posts } from 'imports/collections/posts';

Meteor.publish('postCollection', () => {
  return Posts.find({});
});