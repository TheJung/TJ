import { Post } from 'imports/models/post';
import { User } from 'imports/models/user';
import { Threads } from 'imports/collections/threads';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { MeteorObservable } from 'meteor-rxjs';

Meteor.methods({
  'thread.new': (title: string, content: string, author: Mongo.ObjectID, tags: Array<string>) => {
    // create a new post for root post to this thread.

    Threads.insert({
      _id: new Mongo.ObjectID(),
      author: author,
      tags: tags,
      root: {
        _id: new Mongo.ObjectID(),
        title: title,
        content: content,
        createdAt: new Date(),
        author: author
      },
      children: new Array<Post>()
    });
  },
  'thread.remove': (thread: Mongo.ObjectID) => {
    Threads.remove({
      '_id': thread
    })
  }
});