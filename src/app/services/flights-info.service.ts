import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class FlightsInfoService {
  baseUrl: string;

  constructor(@Inject(DOCUMENT) private document: Document, private httpClient: HttpClient) {
    this.baseUrl = this.document.location.origin;
  }

  requestGetNonStopTickets(): Observable<any> {
    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': '4df3f89d6861e092b8f5d30e3d49cde8'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.request('get', this.baseUrl + '/v1/prices/direct?origin=MOW&destination=LED&token=4df3f89d6861e092b8f5d30e3d49cde8', requestOptions)
  }
}
