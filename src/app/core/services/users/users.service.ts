import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config';
import { UserDataModel } from '../../models/userData.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  updateUser(user: UserDataModel) {
    return this.http.put<any>(`${BASE_URL}api/user`, user);
  }

  getAllUsers(): Observable<UserDataModel[]> {
    return this.http.get<UserDataModel[]>(`${BASE_URL}api/users`)
  }

  deleteUser(email: string) {
    return this.http.delete(`${BASE_URL}api/users/${email}`)
  }
}
