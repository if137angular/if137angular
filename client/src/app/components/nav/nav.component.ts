import { Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  links: any = routes?.[1].children;
  activeLink = this.pLocation.hash.slice(1);

  constructor(private pLocation: PlatformLocation) {}
}
