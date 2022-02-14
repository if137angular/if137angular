import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { SearchComponent } from './components/search/search.component';

import { FlightTicketsForSpecialDatesComponent } from './components/flight-tickets-for-special-dates/flight-tickets-for-special-dates.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';
import { CheapestTicketsComponent } from './components/cheapest-tickets/cheapest-tickets.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { FlightPriceTrendsComponent } from './components/flight-price-trends/flight-price-trends.component';

import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'search',
    component: SearchComponent,
    children: [
      {
        path: 'flight-tickets',
        component: FlightTicketsForSpecialDatesComponent,
        data: { tab: 'Tickets' },
      },
      // {
      //   path: 'non-stop-tickets',
      //   component: NonStopTicketsComponent,
      //   data: { tab: 'Non Stop Tickets' },
      // },
      {
        path: 'cheapest-tickets',
        component: CheapestTicketsComponent,
        data: { tab: 'Cheapest Tickets' },
      },
      {
        path: 'special-offers',
        component: SpecialOffersComponent,
        data: { tab: 'Special Offers' },
      },
      {
        path: 'trends',
        component: FlightPriceTrendsComponent,
        data: { tab: 'Price trends' },
      },
    ],
  },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
