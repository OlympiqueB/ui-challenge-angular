import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/user.model';
import { BASE_URL } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  createUser(user: UserModel): Observable<any> {
    let header: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=UTF-8'
    );

    return this.http.post<UserModel>(`${BASE_URL}api/users`, user, {
      headers: header,
    });
  }
}
