import { Post } from 'imports/models/post';
import { User } from 'imports/models/user';
import { Threads } from 'imports/collections/threads';
import { Meteor } from 'meteor/meteor';

import { MeteorObservable } from 'meteor-rxjs';

import { Posts } from 'imports/collections/posts';

import * as hat from 'hat/index.js';

Meteor.methods({
  'newThread': (title: string, content: string, author: string) => {
    const post_id = hat();

    Meteor.call('addPost', post_id, title, content, author);

    Threads.insert({
      title: title,
      author: author,
      rootPost: post_id
    });
  }
});