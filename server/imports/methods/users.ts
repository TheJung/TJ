import { Users } from 'imports/collections/users';
import { Meteor } from 'meteor/meteor';

import { hash, verify, argon2d } from 'argon2';
import { TokenHelper } from 'imports/util/token/token-helper';
import { User } from 'imports/models/user';

Meteor.methods({
  'user.login': async (id: string, password: string) => {
    let result = Users.find({
      id: id,
      password: password
    });

    let requestedUser: User;

    result.forEach((documents) => {
      for (let user of documents) {
        requestedUser = user;
      }
    });

    const now = new Date();
    const tokHelper = new TokenHelper();

    return tokHelper.requestToken({
      _id: requestedUser._id,
      // 7 days
      expiresIn: now.getTime() + 604800
    });
  },
  'user.register': async (id: string, pw: string, nick: string) => {
    const hashed = await hash(pw, { type: argon2d });

    const _id = new Mongo.ObjectID();

    Users.insert({
      '_id': _id,
      'id': id,
      'password': hashed,
      'nickname': nick,
      'isAdmin': false
    });

    return _id;
  },
  'user.reauth': async (token: string) => {
    const tokHelper = new TokenHelper();
    const original = tokHelper.validateToken(token);

    let result = Users.find({ _id: original._id });
    let requestedUser: User;
    
    result.forEach((documents) => {
      for (let user of documents) {
        requestedUser = user;
      }
    });

    const now = new Date();

    return tokHelper.requestToken({
      _id: requestedUser._id,
      // 7 days
      expiresIn: now.getTime() + 604800
    });
  },
  'user.token.valid': (token: string, password: string) => {
    const tokHelper = new TokenHelper();
    const original = tokHelper.validateToken(token);

    if (original.expiresIn < new Date().getTime()) {
      return false;
    }

    let result = Users.find({ _id: original._id, password: password });

    return !result.isEmpty();
  }
});