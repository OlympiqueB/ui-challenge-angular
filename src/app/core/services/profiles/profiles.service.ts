import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
  constructor(private http: HttpClient) {}

  getProfileInfo(username: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}api/profiles/${username}`);
  }
}
