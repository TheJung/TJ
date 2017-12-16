import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-view-forum',
  templateUrl: 'view-forum.html',
})
export class ViewForumPage {
  forum_id: string;
  page: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.forum_id = route.snapshot.paramMap.get('forum_id');
    this.page = route.snapshot.paramMap.get('page');
  }

  newTopic() {
    this.router.navigateByUrl('/topic/new/' + this.forum_id);
  }
}