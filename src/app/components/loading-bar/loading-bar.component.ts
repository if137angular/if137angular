import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FlightInfoState } from 'src/app/store/flight-info.state';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  isLoading: boolean;

  constructor(public store: Store) {}

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.loading)
      .subscribe((loading) => (this.isLoading = loading));
  }
}
