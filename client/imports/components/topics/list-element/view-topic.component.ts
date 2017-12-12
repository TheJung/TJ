import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'view-topic',
  templateUrl: 'view-topic.html',
  styleUrls: ['view-topic.scss'],
  inputs: ['data']
})
export class ViewTopicComponent implements OnInit {
  @Input() data;
  @Input() views: number;
  @Input() likes: number;

  thread_id: string;

  constructor() { }
  
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}