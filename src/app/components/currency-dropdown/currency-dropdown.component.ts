import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetCurrencies } from 'src/app/store/request-data.action';
import { RequestDataState } from 'src/app/store/request-data.state';
import { CurrencyDropdownModel } from 'src/app/models/Currency-dropdown.model';

@Component({
  selector: 'app-currency-dropdown',
  templateUrl: './currency-dropdown.component.html',
  styleUrls: ['./currency-dropdown.component.scss'],
})
export class CurrencyDropdownComponent implements OnInit {
  @Select(RequestDataState.currencies) currencies$: Observable<CurrencyDropdownModel[]>;
  selectedOption: string = 'uah';

  constructor(private store: Store) { }

  currencies: CurrencyDropdownModel[] = []

  ngOnInit(): void {
    this.store.dispatch(new GetCurrencies());
    this.currencies$.subscribe((currency: CurrencyDropdownModel[]) => {
      this.currencies = currency;

    })
  }

  getValue(data: string): void {
    this.selectedOption = data
    console.log("Test value:", this.selectedOption)
  }
}
