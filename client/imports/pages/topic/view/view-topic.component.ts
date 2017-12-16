import { Post } from 'imports/models/post';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'page-view-topic',
  templateUrl: 'view-topic.html'
})
export class ViewTopicPage {
  constructor(private route: ActivatedRoute, private router: Router) {
    this.posts = [];
  }

  posts: Array<Post>;
  content: string = '';

  id: string = this.route.snapshot.paramMap.get('id');
  page: string = this.route.snapshot.paramMap.get('page');

  submit: Function = () => {
    //*
    this.posts.push({
      title: 'Test1',
      content: this.content,
      createdAt: new Date(),
      author: new Mongo.ObjectID()
    }); //*/

    this.content = '';
  
  }
}