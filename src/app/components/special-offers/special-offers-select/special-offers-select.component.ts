import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-special-offers-select',
  templateUrl: './special-offers-select.component.html',
  styleUrls: ['./special-offers-select.component.scss']
})
export class SpecialOffersSelectComponent implements OnChanges {

  @Input() selectedLanguage: string = '';
  @Output() selectedLanguageChange = new EventEmitter<string>();
  languageControl: FormControl = new FormControl('');

  @Input() selectedCurrency: string = '';
  @Output() selectedCurrencyChange = new EventEmitter<string>();
  currencyControl: FormControl = new FormControl('');

  specialOffersFrom: FormGroup;

  languages: { [key: string]: string } = {
    "ar": "Arabic",
    "az": "Azerbaijani",
    "be": "Belarusian",
    "bg": "Bulgarian",
    "bn": "Bengali",
    "bs": "Bosnian",
    "ca": "Catalan, Valencian",
    "ce": "Chechen",
    "cs": "Czech",
    "da": "Danish",
    "de": "German",
    "el": "Greek",
    "en": "English (Great Britain)",
    "en_us": "American English",
    "es": "Spanish",
    "et": "Estonian",
    "fa": "Persian",
    "fi": "Finnish",
    "fr": "French",
    "he": "Hebrew",
    "hi": "Hindi",
    "hr": "Croatian",
    "hu": "Hungarian",
    "hy": "Armenian",
    "id": "Indonesian",
    "is": "Icelandic",
    "it": "Italian",
    "ja": "Japanese",
    "ka": "Georgian",
    "kk": "Kazakh",
    "kmr": "Kurmanji (Kurdish)",
    "ko": "Korean",
    "ku": "Kurdish",
    "ky": "Kirghiz (Kyrgyz)",
    "lt": "Lithuanian",
    "lv": "Latvian",
    "me": "Montenegrin (Latin)",
    "mk": "Macedonian",
    "mn": "Mongolian",
    "ms": "Malay",
    "nl": "Dutch(Flemish)",
    "no": "Norwegian",
    "pl": "Polish",
    "pt": "Portuguese",
    "pt_br": "Brazilian Portuguese",
    "ro": "Romanian",
    "ru": "Russian",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sq": "Albanian",
    "sr_cs": "Serbian",
    "sv": "Swedish",
    "tg": "Tajik",
    "th": "Thai",
    "tl": "Tagalog (Filipino)",
    "tr": "Turkish",
    "uk": "Ukrainian",
    "uz": "Uzbek",
    "vi": "Vietnamese",
    "zh-hans": "Chinese (Simplified)",
    "zh-hant": "Chinese (Traditional)"
  };

  currencies: { [key: string]: string } = {
    "usd": "US Dollar (USD)",
    "eur": "Euro (EUR)",
    "aed": "UAE dirham (AED)",
    "all": "Albanian lek (ALL)",
    "amd": "Armenian Dram (AMD)",
    "ars": "Argentine peso (ARS)",
    "aud": "Australian Dollar (AUD)",
    "azn": "Azerbaijani Manat (AZN)",
    "bam": "Bosnian convertible marka (BAM)",
    "bdt": "Bangladeshi taka (BDT)",
    "bgn": "Bulgarian lev (BGN)",
    "bhd": "Bahraini Dinar (BHD)",
    "brl": "Brazilian real (BRL)",
    "byn": "Belarusian ruble (BYN)",
    "cad": "Canadian Dollar (CAD)",
    "chf": "Swiss Franc (CHF)",
    "clp": "Chilean peso (CLP)",
    "cny": "Chinese Yuan (CNY)",
    "cop": "Colombian peso (COP)",
    "czk": "Czech koruna (CZK)",
    "dkk": "Danish krone (DKK)",
    "dzd": "Algerian dinar (DZD)",
    "egp": "Egyptian Pound (EGP)",
    "gbp": "British Pound Sterling (GPB)",
    "gel": "Georgian lari (GEL)",
    "ghs": "Ghanaian cedi (GHS)",
    "hkd": "Hong Kong Dollar (HKD)",
    "hrk": "Croatian kuna (HRK)",
    "htg": "Haitian gourde (HTG)",
    "huf": "Hungarian forint (HUF)",
    "idr": "Indonesian Rupiah (IDR)",
    "ils": "Israeli Shekel (ILS)",
    "inr": "Indian Rupee (INR)",
    "iqd": "Iraqi dinar (IQD)",
    "irr": "Iranian rial (IRR)",
    "isk": "Icelandic Krona (ISK)",
    "jod": "Jordanian dinar (JOD)",
    "jpy": "Japanese Yen (JPY)",
    "kes": "Kenyan shilling (KES)",
    "kgs": "Som (KGS)",
    "krw": "South Korean won (KRW)",
    "kwd": "Kuwaiti Dinar (KWD)",
    "kzt": "Kazakhstani Tenge (KZT)",
    "lkr": "Sri Lankan Rupee (LKR)",
    "lyd": "Libyan dinar (LYD)",
    "mdl": "Moldovan Leu (MDL)",
    "mnt": "Mongolian tughrik (MNT)",
    "mur": "Mauritian Rupees (MUR)",
    "mxn": "Mexican peso (MXN)",
    "myr": "Malaysian ringgit (MYR)",
    "mzn": "Mozambican metical (MZN)",
    "ngn": "Nigerian Naira (NGN)",
    "nok": "Norwegian Krone (NOK)",
    "npr": "Nepalese Rupee (NPR)",
    "nzd": "New Zealand Dollar (NZD)",
    "omr": "Omani rial (OMR)",
    "pen": "Peruvian sol (PEN)",
    "php": "Philippine Peso (PHP)",
    "pkr": "Pakistan Rupee (PKR)",
    "pln": "Polish zloty (PLN)",
    "qar": "Qatari Rials (QAR)",
    "ron": "Romanian leu (RON)",
    "rsd": "Serbian dinar (RSD)",
    "rub": "Russian Ruble (RUB)",
    "sar": "Saudi riyal (SAR)",
    "sek": "Swedish krona (SEK)",
    "sgd": "Singapore Dollar (SGD)",
    "thb": "Thai Baht (THB)",
    "tjs": "Tajikistani somoni (TJS)",
    "tnd": "Tunisian dinar (TND)",
    "try": "Turkish lira (TRY)",
    "twd": "Taiwan new dollar (TWD)",
    "uah": "Ukrainian Hryvnia (UAH)",
    "uzs": "Uzbekistani som (UZS)",
    "vef": "Venezuelan Bolívar (VEF)",
    "vnd": "Vietnamese dong (VND)",
    "xof": "CFA Franc (XOF)",
    "zar": "South African Rand (ZAR)",
    "zmw": "Zambian Kwacha (ZMW)",
  };

  constructor() {
    this.specialOffersFrom = new FormGroup({
      language: this.languageControl,
      currency: this.currencyControl
    });
  }

  ngOnChanges(): void {
    this.languageControl.setValue(this.selectedLanguage);
    this.currencyControl.setValue(this.selectedCurrency);
  }

  languageSelected(): void {
    this.selectedLanguage = this.languageControl.value;
    this.selectedLanguageChange.emit(this.selectedLanguage);
    console.log('TESTING Language value:', this.selectedLanguage);
  }

  currencySelected(): void {
    this.selectedCurrency = this.currencyControl.value;
    this.selectedCurrencyChange.emit(this.selectedCurrency);
    console.log('TESTING Currency value:', this.selectedCurrency);
  }

}
