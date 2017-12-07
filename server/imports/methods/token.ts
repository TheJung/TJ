import { Meteor } from 'meteor/meteor';

import * as jwt from 'jwt-simple';
import * as env from 'node-env-file';

const SECRET_KEY = 'TEST_SECRET_KEY';

Meteor.methods({
  'token.request': (obj: any) => {
    const token = jwt.encode(obj, SECRET_KEY);

    return token;
  },
  'token.validate': (token: string) => {
    return jwt.decode(token, SECRET_KEY);
  }
})