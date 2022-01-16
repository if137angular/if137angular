import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';

@Component({
  selector: 'app-non-stop-tickets',
  templateUrl: './non-stop-tickets.component.html',
  styleUrls: ['./non-stop-tickets.component.scss'],
})
export class NonStopTicketsComponent implements OnInit {
  data: { data: Record<string, any> };
  formData: any;
  cityOrigin: string;
  cityArrival: string;
  div: boolean = false;
  btnName: string = 'Open';
  
  

  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;

  constructor(private flightsInfoService: FlightsInfoService) {}

  ngOnInit(): void {
   this.formData = this.formData$.subscribe(formData => {
      this.flightsInfoService
        .requestGetNonStopTickets(
          formData.destinationFrom.code,
          formData.destinationTo.code
        )
        .subscribe((response) => {
          this.data = response;
          console.log(this.data);
          this.cityOrigin = formData.destinationFrom.name;
          this.cityArrival = formData.destinationTo.name;
        });
    });
  }

  onToggle(){
    this.div = !this.div
   if (this.div) 
   this.btnName = 'Close';
   else this.btnName = 'Open'
  };
}
