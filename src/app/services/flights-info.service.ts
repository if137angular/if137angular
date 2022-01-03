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

  exampleRequestGetChipTickets(): Observable<any> {
    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': 'PutYourTokenHere'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.request('get', this.baseUrl + '/v1/prices/cheap?origin=LWO&destination=HKT&token=PutYourTokenHere', requestOptions)
  }
}