import { Component } from '@angular/core';
import { AuthHelper } from 'imports/util/auth/auth-helper';

@Component({
  selector: 'view-menubar',
  templateUrl: 'view-menubar.html'
})
export class ViewMenubarComponent {
  currentUser: any;

  constructor(private account: AuthHelper) {
    account.currentState().then((res) => {

    });
  }
}