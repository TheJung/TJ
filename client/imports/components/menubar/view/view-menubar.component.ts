import { Component, OnInit } from '@angular/core';
import { AuthHelper } from 'imports/util/auth/auth-helper';

@Component({
  selector: 'view-menubar',
  templateUrl: 'view-menubar.html'
})
export class ViewMenubarComponent implements OnInit {
  currentUser: { id: string, nickname: string, _id: Mongo.ObjectID };

  nickname = '';

  constructor(private account: AuthHelper) { }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.account = new AuthHelper();
    
    this.nickname = (await this.account.currentUserInfo()).nickname;
  }
}