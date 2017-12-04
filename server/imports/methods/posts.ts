import { Meteor } from 'meteor/meteor';

import { Posts } from '../../../imports/collections/posts';
import { User } from 'imports/models/user';

import * as hat from 'hat/index.js';

Meteor.methods({
  'addPost': (_id: string, title: string, content: string, author: string) => {
    if (_id.length <= 0) {
      _id = hat();
    }

    Posts.insert({
      'title': title,
      'content': content,
      'author': author,
      'createdAt': new Date()
    });
  }
});