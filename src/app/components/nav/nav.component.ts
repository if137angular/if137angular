import { Component } from '@angular/core';
import { routes } from 'src/app/app-routing.module';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
    links: any = routes
  
    activeLink = this.links[0].data.tab;

}
