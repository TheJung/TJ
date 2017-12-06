import { MeteorObservable } from 'meteor-rxjs';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { MenuItem } from 'primeng/primeng';
import { ElementRef, ViewChild } from '@angular/core';
import { Post } from 'imports/models/post';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})
export class HomeComponent {

}