import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'page-new-topic',
  templateUrl: 'new-topic.html'
})
export class NewTopicPage {
  @ViewChild('data') data: any;
  
  constructor() {
    
  }

  submitted($event) {
    console.log('run!!');
  }
}