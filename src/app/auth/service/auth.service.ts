import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RegisterRequstInterface } from '../models/registerRequst.interface';
import { AuthResponsUserInterface, CurrentUserInterface } from '../models/currentUser.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {}

  register(data: RegisterRequstInterface): Observable<CurrentUserInterface> {
    const url = 'https://api.realworld.io/api/users'

    return this.http.post<AuthResponsUserInterface>(url, data)
      .pipe(
        map((response: AuthResponsUserInterface) => response.user),
      )
  }
}
