import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarOfPricesComponent } from './calendar-of-prices/calendar-of-prices.component';

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarOfPricesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
