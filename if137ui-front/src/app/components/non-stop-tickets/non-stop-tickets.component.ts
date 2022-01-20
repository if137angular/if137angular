import { Component, OnInit } from '@angular/core';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { FormDataModel } from 'src/app/models/formData.model';
import { faPlane, faPlaneDeparture, faPlaneArrival, faHryvnia, faMapMarker, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";



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
  faPlane = faPlane;
  faDeparture = faPlaneDeparture;
  faArrival = faPlaneArrival;
  faHryvnia = faHryvnia;
  faMap = faMapMarker;
  faMapAlt = faMapMarkerAlt;

  @Select(RequestDataState.formData) formData$: Observable<FormDataModel>;

  constructor(private flightsInfoService: FlightsInfoService) {}

  ngOnInit(): void {
   this.formData = this.formData$.subscribe(formData => {
      this.flightsInfoService
        .requestGetNonStopTickets(
          formData.destinationFrom.code,
          formData.destinationTo.code,
          formData.startDate.toISOString().slice(0,7),
          formData.endDate.toISOString().slice(0,7)
        )
        .subscribe((response) => {
          this.data = response;
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
