import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgxsModule } from '@ngxs/store';
import { appState } from 'src/app/store/appState';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

import { RequestDataService } from 'src/app/services/request-data.service';
import { FlightsInfoService } from 'src/app/services/flights-info.service';

import { AppComponent } from './app.component';
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { NavComponent } from './components/nav/nav.component';
import { FirstComponent } from './components/forTest/first/first.component';
import { SecondComponent } from './components/forTest/second/second.component';
import { ThirdComponent } from './components/forTest/third/third.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataFormComponent,
    AutocompleteInputComponent,
    ButtonComponent,
    DatepickerComponent,
    TransfersComponent,
    NavComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    AutocompleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    MatFormFieldModule,

    NgxsModule.forRoot(appState, {
      developmentMode: true,
    }),
    NgxsLoggerPluginModule.forRoot(),
  ],
  providers: [RequestDataService, FlightsInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
