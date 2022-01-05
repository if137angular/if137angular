import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstComponent } from './components/forTest/first/first.component'; // only for test, delete
import { SecondComponent } from './components/forTest/second/second.component'; // only for test, delete
import { ThirdComponent } from './components/forTest/third/third.component'; // only for test, delete

export const routes: Routes = [
  {path: '', component: FirstComponent, data: {tab: 'First'}}, // only for test, delete
  {path: 'second', component: SecondComponent, data: {tab: 'Second'}}, // only for test, delete
  {path: 'third', component: ThirdComponent, data: {tab: 'Third'}} // only for test, delete
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
