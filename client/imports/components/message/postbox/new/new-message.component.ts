import { Component, Input } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Users } from 'imports/collections/users';

@Component({
  selector: 'new-message',
  templateUrl: 'new-message.html'
})
export class NewMessageComponent {
  userInput: string;
  content;
  results: Array<any>;
  resultsData: Array<any>;

  users;

  @Input() whenCreated: (value) => void;

  constructor() {
    this.resultsData = new Array<any>();
    this.userInput = '';

    MeteorObservable.subscribe('db.users.no-password').subscribe(() => {
      this.users = Users.find({});
    });

    console.log(this.userInput);
  }

  search(event: { originalEvent: any, query: string }) {
    this.results = [];
    let q = event.query;
    
    for (let user of this.users.fetch()) {
      if (user.nickname.includes(this.userInput)) {
        let found = this.resultsData.find((value, index, array) => {
          console.log(value.nickname, q);
          return value.nickname.includes(q);
        });
  
        this.results.push(user.nickname);
  
        if (!found) {
          this.resultsData.push(user);
        }
      }
    }

    console.log('search: ', this.results);

    console.log('users:', this.resultsData);
  }

  autoOnSelect(value) {
    console.log(value);
  }

  autoOnKeyup(event) {
    console.log(event);
  }

  makeNewMessage() {
    let users = [];
    this.resultsData.forEach(element => {
      users.push(element);
    });

    let result = new Promise<any>((response, reject) => {
      Meteor.call('message.new', users, (err, res) => {
        if (err !== undefined) {
          reject(err);
        }

        response(res);
      });
    });

    result.then((value) => {
      this.whenCreated(value);
    });
  }

  popInList(index) {
    console.log(index);
    let _new = [];
    let _copy = this.resultsData;
    this.resultsData = [];

    for(let a in _copy) {
      if (a !== index) {
        _new.push(this.resultsData[a]);
      } else {
        console.log(this.resultsData[a]);
      }
    }

    this.resultsData = _new;
  }
}