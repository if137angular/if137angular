import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetCurrencies } from 'src/app/store/request-data.action';
import { Currency } from 'src/app/models/special-offers.model';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
  @Select(RequestDataState.currencies) currencies$: Observable<Currency[]>;
  selectedOption: string = 'usd';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCurrencies());
  }
}
