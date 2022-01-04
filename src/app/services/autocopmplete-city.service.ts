import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocopmpleteCityService {

  private autocompleteAPI = 'http://autocomplete.travelpayouts.com/places2?term=lviv&locale=ua&types[]=city'

  constructor(private http: HttpClient) { }

  getCurrency(): Observable<any> {
    return this.http.get<any>(this.autocompleteAPI)
  }
}
