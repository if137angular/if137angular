import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RequestDataState } from 'src/app/store/request-data.state';
import { IpFullModel } from 'src/app/models/ip.model';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']
})
export class UserLocationComponent implements OnInit {
  userDistrict: string;
  userIp: string;
  userTimezone: any;


  @Select(RequestDataState.userData) userData$: Observable<IpFullModel>

  constructor() { }

  ngOnInit(): void {

    this.userData$.subscribe((userData: IpFullModel) => {
      this.userIp = userData.ip;
      this.userDistrict = userData.district;
      this.userTimezone = userData.time_zone.current_time;
     });


  }

}
