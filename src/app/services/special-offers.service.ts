import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SpecialOffersService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
  }

  getSpecialOffers() {
    const headerDict = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'x-access-token': 'b482025a8bf39817b6b6f219686b4799'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.httpClient.request('get', this.baseUrl + '/get_special_offers?origin=LWO&currency=usd&token=b482025a8bf39817b6b6f219686b4799', requestOptions)
  }
}
