import { Meteor } from 'meteor/meteor';

import * as jwt from 'jwt-simple';
import * as env from 'node-env-file';

const SECRET_KEY = 'TEST_SECRET_KEY';

Meteor.methods({
  'token.request': (obj: any) => {
    const now = new Date().getTime();
    
    const token = jwt.encode(obj, SECRET_KEY);

    return token;
  },
  'token.validate': (token: string) => {
    const obj = jwt.decode(token, SECRET_KEY);

    const now = new Date().getTime();

    // token has expired.
    if (obj.expiresIn < now) {
      throw {
        type: "Token.Error",
        message: "토큰이 만료 되었습니다."
      };
    }

    return obj;
  }
})