import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlightInfoState } from 'src/app/store/flight-info.state';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Select(FlightInfoState.loading) loading$: Observable<any>;

  constructor() {}
}
