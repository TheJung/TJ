import { TokenHelper } from 'imports/util/token/token-helper'
import { Component } from '@angular/core';
import { AuthHelper } from 'imports/util/auth/auth-helper';
import { LocalDatabase } from 'imports/util/db/localdb-helper';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
  id: string;
  password: string;
  nick: string;

  helper = new AuthHelper();
  db = new LocalDatabase('user');

  login() {
    let err: Meteor.Error;
    this.helper.login(this.id, this.password).then((res) => {
      this.db.setItem('latest-signed', {
        token: res
      });
    });
  }

  register() {
    let user = this.helper.register(this.id, this.password, this.nick);

    if (user) {
      console.log('success:', user);
    }
  }
}