import { Users } from 'imports/collections/users';
import { Meteor } from 'meteor/meteor';

import { hash, verify, argon2d } from 'argon2';
import { TokenHelper } from 'imports/util/token/token-helper';
import { User } from 'imports/models/user';

Meteor.methods({
  'user.login': async (id: string, password: string) => {
    let result = Users.find({
      id: id
    });

    if (result.fetch().length <= 0) {
      throw new Meteor.Error('User.Error.NoResult', '해당하는 계정이 없습니다.');
    }

    for (let user of result.fetch()) {
      let verifying = await verify(user.password, password);

      if (verifying) {
        const now = new Date();
        const tokHelper = new TokenHelper();
    
        return await tokHelper.requestToken({
          _id: user._id,
          // 7 days
          expiresIn: now.getTime() + 604800000
        });
      }
    }

    //throw new Meteor.Error('User.Error.Internal', '내부 함수에서 오류가 발생했습니다.');
  },
  'user.register': async (id: string, pw: string, nick: string) => {
    const hashed = await hash(pw, { type: argon2d });
    const _id = new Mongo.ObjectID();

    let result = Users.find({
      'id': id
    });

    if (result.fetch().length > 0) {
      console.error('이미 같은 id의 계정이 존재합니다.');
      throw new Meteor.Error('User.Error', '이미 같은 id의 계정이 존재합니다.');
    }

    ///*
    Users.insert({
      '_id': _id,
      'id': id,
      'password': hashed,
      'nickname': nick,
      'isAdmin': false
    }); //*/


    return _id;
  },
  'user.reauth': async (token: string, password: string) => {
    const tokHelper = new TokenHelper();
    const original = await tokHelper.validateToken(token);

    let result = Users.find({ _id: original._id, password: original.password });
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
      expiresIn: now.getTime() + 604800000
    });
  },
  'user.token.valid': async (token: string) => {
    const tokHelper = new TokenHelper();
    const original = await tokHelper.validateToken(token);
    
    if (original.expiresIn < new Date().getTime()) {
      return false;
    }

    let result = Users.find({ _id: original._id });

    return {
      valid: !result.isEmpty(),
      uid: original._id
    };
  },
  'user.info.me': async (token: string) => {
    const tokHelper = new TokenHelper();
    const me = await tokHelper.validateToken(token);

    let uid = new Mongo.ObjectID(me._id._str);

    let result = Users.findOne({ _id: uid });

    console.log(result);

    return {
      _id: result._id,
      id: result.id,
      nickname: result.nickname
    };
  }
});