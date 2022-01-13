import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetCalendarOfPricesRequestModel } from '../models/calendar-of-prices.model';
import { TicketsRequestParam } from '../models/cheapest-tickets.model';
import { map } from 'rxjs/operators';
import {GetDestinationPopular} from "../components/city-destination/city-destination.component";

@Injectable()
export class FlightsInfoService {
  constructor(private http: HttpClient) {}

  exampleRequestGetChipTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': 'PutYourTokenHere',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v2/prices/cheap?origin=LWO&destination=HKT&token=PutYourTokenHere',
      requestOptions
    );
  }
  RequestGetCalendarOfPrices() {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.get<GetCalendarOfPricesRequestModel>(
      '/v2/prices/week-matrix?currency=usd&origin=LED&destination=HKT&show_to_affiliates=true&depart_date=2022-01-17&return_date=2022-01-24&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }
  getSpecialOffers(
    cityOrign: string,
    locale: string,
    currency: string
  ): Observable<any> {
    return this.http.get<any>(
      `/aviasales/v3/get_special_offers?origin=${cityOrign}&locale=${locale}&currency=${currency}&token=b482025a8bf39817b6b6f219686b4799`
    );
  }

  requestGetNonStopTickets(): Observable<any> {
    const headerDict = {
      'x-access-token': '4df3f89d6861e092b8f5d30e3d49cde8',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/direct?origin=MOW&destination=LED&token=4df3f89d6861e092b8f5d30e3d49cde8',
      requestOptions
    );
  }

  requestCheapestTickets(ticketsParam: TicketsRequestParam): Observable<any> {
    const baseURL: string = '/v1/prices/cheap';
    const myToken: string = 'f29a4f3a27eb2f3ea190c91cd4e15fa5';

    let myParamsURL = new HttpParams()
      .append('origin', ticketsParam.origin)
      .append('destination', ticketsParam.destination)
      .append('currency', ticketsParam.currency)
      .append('token', myToken);
    if (ticketsParam.departDate)
      myParamsURL.append('depart_date', ticketsParam.departDate);
    if (ticketsParam.returnDate)
      myParamsURL.append('depart_date', ticketsParam.returnDate);

    let myHeadersURL = new HttpHeaders().append('x-access-token', myToken);

    return this.http
      .get(baseURL, { headers: myHeadersURL, params: myParamsURL })
      .pipe(
        map((response) => ({
          ...response,
          origin: ticketsParam.origin,
          destination: ticketsParam.destination,
        }))
      );
  }
  getFlightPriceTrends(): Observable<any> {
    const headerDict = {
      'x-access-token': '51b362c72de38be9bcfdc31c8339c019',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      '/v1/prices/calendar?depart_date=2021–11&origin=MOW&destination=BCN&calendar_type=departure_date&token=51b362c72de38be9bcfdc31c8339c019',
      requestOptions
    );
  }


  // My code for Get Flight tikets for Date

  getFlightTicketsForDate(codeFrom: string, codeTo: string, startDate: string, endDate: string): Observable<any> {
    const headerDict = {
      'x-access-token': 'd077e8cd07cd09cedc63a920f064b1ab'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get(
      `/aviasales/v3/prices_for_dates?origin=${codeFrom}&destination=${codeTo}&departure_at=${startDate}&return_at=${endDate}&unique=false&sorting=price&direct=true&currency=usd&limit=10&page=1&one_way=true&token=d077e8cd07cd09cedc63a920f064b1ab`,
      requestOptions
    );
  }

  // ****** END *******
    requestDestinationModel(origin:string):Observable<GetDestinationPopular>{
    const headerDict = {
      'x-access-token': 'fd45945b3cf27c0f371a6a177e5c8adc',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get<GetDestinationPopular>( `/v1/city-directions?origin=${origin}&currency=usd&token=fd45945b3cf27c0f371a6a177e5c8adc`,requestOptions);
  }



  requestPopularDestination(origin:string ): Observable<GetDestinationPopular> {
    const headerDict = {
      'x-access-token': 'fd45945b3cf27c0f371a6a177e5c8adc'
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<GetDestinationPopular>( `/v1/city-directions?origin=${origin}&currency=usd&token=fd45945b3cf27c0f371a6a177e5c8adc`,requestOptions)
  }
}
