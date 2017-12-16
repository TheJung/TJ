import { Component } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html'
})
export class NewMessagePage {
  constructor(route: ActivatedRoute, private router: Router) { }

  complete(val) {
    this.router.navigateByUrl('/user/postbox/' + val);
  }

}