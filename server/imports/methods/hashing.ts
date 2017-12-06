import { Meteor } from 'meteor/meteor';

import { hash, argon2d, verify } from 'argon2';
import { MeteorObservable } from 'meteor-rxjs';

Meteor.methods({
  'hashPassword': (password: string) => {
    const hashed_pw = hash('password', { type: argon2d });
    hashed_pw.then(a => { console.log(password, " : ", a); });

    return hashed_pw;
  },

  'verifyPassword': async (raw_string: string) => {
    
    const verifying = await verify(h1, raw_string);

    if (verifying) {
      console.log('correct');
    } else {
      console.log('incorrect');
    }
  }
})