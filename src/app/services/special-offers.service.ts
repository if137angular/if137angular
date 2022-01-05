import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DOCUMENT } from "@angular/common";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpecialOffersService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) {
    this.baseUrl = this.document.location.origin;
  }

  getSpecialOffers(originCity: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + `/aviasales/v3/get_special_offers?origin=${originCity}&currency=usd&token=b482025a8bf39817b6b6f219686b4799`)
  }
}
