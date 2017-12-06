import { Component } from '@angular/core';

import { Meteor } from 'meteor/meteor';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.html',
  styleUrls: ['sign-up.scss']
})
export class SignUpComponent {
  createUser(id: string, pw: string) {
  }
}