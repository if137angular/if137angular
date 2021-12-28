import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable()
export class FlightsInfoService {
  baseUrl: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
  }
  // exampleRequestGetChipTickets() {
  //   const headerDict = {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  //     'x-access-token': 'PutYourTokenHere'
  //   }
  //
  //   const requestOptions = {
  //     headers: new HttpHeaders(headerDict)
  //   };
  //   return this.httpClient.request('get', this.baseUrl + '/prices/cheap?origin=LWO&destination=HKT&token=PutYourTokenHere', requestOptions)
  // }
}
