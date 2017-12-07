import { Meteor } from 'meteor/meteor';

import { hash, argon2d, verify } from 'argon2';
import { MeteorObservable } from 'meteor-rxjs';

Meteor.methods({
  'password.hash': (password: string) => {
    const hashed_pw = hash('password', { type: argon2d });
    hashed_pw.then(a => { console.log(password, " : ", a); });

    return hashed_pw;
  },

  'password.verify': async (raw_string: string) => {
    
    const isValid = await verify('', raw_string);

    return isValid;
  }
})