import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    standalone: false
})
export class ContentComponent {
  @Input() title: string;

  constructor() {
    this.title = '';
  }
}
