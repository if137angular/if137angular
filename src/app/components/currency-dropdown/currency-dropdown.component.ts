import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { SetCurrency } from 'src/app/store/request-data.action';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CurrencyDropdownModel } from 'src/app/models/Currency-dropdown.model';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent {
  @Select(RequestDataState.currencies)
  currencies$: Observable<CurrencyDropdownModel[]>;
  @Select(RequestDataState.currency)
  selectedCurrency$: Observable<any>;

  constructor(private store: Store) { }

  setValue(data: string): void {
    this.store.dispatch(new SetCurrency(data));
  }
}
