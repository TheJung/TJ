import { Component, Input } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'new-thread',
  templateUrl: 'new-thread.html',
  styleUrls: ['new-thread.scss']
})
export class NewThreadComponent {
  content: string;
  items = [
    {label: 'Update', icon: 'fa-refresh', command: () => {
      //this.update();
      console.log('test');
    }},
    {label: 'Delete', icon: 'fa-close', command: () => {
      //this.delete();
      console.log('test');
    }},
    {label: 'Angular.io', icon: 'fa-link', url: 'http://angular.io'},
    {label: 'Theming', icon: 'fa-paint-brush', routerLink: ['/theming']}
  ];
  submit() {
    console.log('test');
  }
}