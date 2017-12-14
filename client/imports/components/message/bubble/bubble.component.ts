import { Component, Input } from "@angular/core";


@Component({
  selector: 'message-bubble',
  templateUrl: 'bubble.html'
})
export class BubbleComponent {
  @Input() text: string;

  constructor() {
    this.text = '';
  }
}