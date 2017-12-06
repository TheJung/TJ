import { Meteor } from 'meteor/meteor';
import { Component } from '@angular/core';

@Component({
  selector: 'login-box',
  templateUrl: 'login-box.html',
  inputs: ['authentication']
})
export class LoginBoxComponent {

  authentication: { id: string, pw: string };

  login() {

  }

  showRegister() {

  }
}