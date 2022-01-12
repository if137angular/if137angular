import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarOfPricesComponent } from './components/calendar-of-prices/calendar-of-prices.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';

export const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
