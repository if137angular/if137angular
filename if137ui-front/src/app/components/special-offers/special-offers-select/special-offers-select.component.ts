import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestDataState } from 'src/app/store/request-data.state';
import { Select } from '@ngxs/store';
import { SpecialOffersSelectModel } from 'src/app/models/special-offers.model';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetCurrencies, GetLanguages } from 'src/app/store/request-data.action';
@Component({
  selector: 'app-special-offers-select',
  templateUrl: './special-offers-select.component.html',
  styleUrls: ['./special-offers-select.component.scss']
})
export class SpecialOffersSelectComponent implements OnChanges, OnInit {
  @Input() selectedLanguage: string = '';
  @Output() selectedLanguageChange = new EventEmitter<string>();
  languageControl: FormControl = new FormControl('');

  @Input() selectedCurrency: string = '';
  @Output() selectedCurrencyChange = new EventEmitter<string>();
  currencyControl: FormControl = new FormControl('');

  specialOffersFrom: FormGroup;

  languages: SpecialOffersSelectModel[] = []

  currencies: SpecialOffersSelectModel[] = []

  @Select(RequestDataState.currencies) currencies$: Observable<SpecialOffersSelectModel[]>

  @Select(RequestDataState.languages) languages$: Observable<SpecialOffersSelectModel[]>

  constructor(private store: Store) {
    this.specialOffersFrom = new FormGroup({
      language: this.languageControl,
      currency: this.currencyControl
    });
  }

  ngOnInit(): void {
    this.setOption();
  }

  ngOnChanges(): void {
    this.languageControl.setValue(this.selectedLanguage);
    this.currencyControl.setValue(this.selectedCurrency);
  }

  setOption(): void {
    this.store.dispatch(new GetLanguages());
    this.languages$.subscribe((languages: any) => {
      this.languages = languages;
    });

    this.store.dispatch(new GetCurrencies());
    this.currencies$.subscribe((currencies: any) => {
      this.currencies = currencies;
    });
  }

  languageSelected(): void {
    this.selectedLanguage = this.languageControl.value;
    this.selectedLanguageChange.emit(this.selectedLanguage);
  }

  currencySelected(): void {
    this.selectedCurrency = this.currencyControl.value;
    this.selectedCurrencyChange.emit(this.selectedCurrency);
  }
}
