import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarOfPricesComponent } from './components/calendar-of-prices/calendar-of-prices.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';
import { CheapestTicketsComponent } from './components/cheapest-tickets/cheapest-tickets.component';
import { CityDestinationComponent } from './components/city-destination/city-destination.component';
import { FlightTicketsForSpecialDatesComponent } from './components/flight-tickets-for-special-dates/flight-tickets-for-special-dates.component';

import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'search',
    component: SearchComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarOfPricesComponent,
        data: { tab: 'Calendar of prices' },
      },
      {
        path: 'special-offers',
        component: SpecialOffersComponent,
        data: { tab: 'Special Offers' },
      },
      {
        path: 'non-stop-tickets',
        component: NonStopTicketsComponent,
        data: { tab: 'Non Stop Tickets' },
      },
      {
        path: 'cheapest-tickets',
        component: CheapestTicketsComponent,
        data: { tab: 'Cheapest Tickets' },
      },
      {
        path: 'app-city-destination',
        component: CityDestinationComponent,
        data: { tab: 'Popular destination' },
      },
      {
        path: 'flight-tickets',
        component: FlightTicketsForSpecialDatesComponent,
        data: { tab: 'Tikets' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
