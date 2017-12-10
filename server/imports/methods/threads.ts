import { Post } from 'imports/models/post';
import { User } from 'imports/models/user';
import { Threads } from 'imports/collections/threads';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { MeteorObservable } from 'meteor-rxjs';

Meteor.methods({
  'thread.new': (forum: Mongo.ObjectID, title: string, content: string, author: Mongo.ObjectID, tags: Array<string>) => {
    // create a new post for root post to this thread.

    const _id = new Mongo.ObjectID();

    Threads.insert({
      _id: _id,
      author: author,
      tags: tags,
      root: {
        _id: new Mongo.ObjectID(),
        title: title,
        content: content,
        createdAt: new Date(),
        author: author
      },
      children: new Array<Post>(),
      master: forum
    });

    return _id;
  },
  'thread.remove': (thread: Mongo.ObjectID) => {
    Threads.remove({
      '_id': thread
    });
  },
  'thread.remove.forum-removed': (forum: Mongo.ObjectID) => {
    Threads.remove({
      master: forum
    });
  }
});