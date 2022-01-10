import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstComponent } from './components/forTest/first/first.component';
import { SecondComponent } from './components/forTest/second/second.component';
import { ThirdComponent } from './components/forTest/third/third.component';
import { NonStopTicketsComponent } from './components/non-stop-tickets/non-stop-tickets.component';

export const routes: Routes = [
  {path: '', component: FirstComponent, data: {tab: 'First'}},
  {path: 'second', component: SecondComponent, data: {tab: 'Second'}},
  {path: 'third', component: ThirdComponent, data: {tab: 'Third'}},
  {path: 'non-stop-tickets', component: NonStopTicketsComponent, data: {tab: 'Non-Stop-Tickets'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
