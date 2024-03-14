import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegModel } from '../../models/userReg.model';
import { BASE_URL } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  createUser(user: UserRegModel): Observable<any> {
    let header: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    return this.http.post<UserRegModel>(`${BASE_URL}api/users`, user, {
      headers: header,
    });
  }
}
