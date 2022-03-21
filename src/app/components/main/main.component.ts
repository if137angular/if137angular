import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  isMobile: boolean;

  constructor() {
    this.isMobile = window.innerWidth < 768;
  }
}
