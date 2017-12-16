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
        author: author,
        likes: new Array<Mongo.ObjectID>(),
        view: 0
      },
      children: new Array<Post>(),
      master: forum,
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
  },
  'thread.view': (thread: Mongo.ObjectID) => {
    Threads.update({
      _id: thread
    }, {
      $inc: {
        'root.view': 1
      }
    });
  }, 
  'thread.like': (thread: Mongo.ObjectID, liker: Mongo.ObjectID) => {
    let t = Threads.findOne({
      _id: thread
    });

    let isLikedBefore = t.root.likes.find((val, index, obj) => {
      return val.toHexString() === liker.toHexString();
    });

    if (isLikedBefore) {
      Threads.update({
        _id: thread
      }, {
        root: {
          $push: {
            likes: liker
          }
        }
      });
    } else {
      throw new Meteor.Error('already-like', '이미 추천했습니다.');
    }
  }
});