import { Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  links: any = routes;
  activeLink = this.pLocation.hash.slice(2);

  constructor(private pLocation: PlatformLocation) {}
}
