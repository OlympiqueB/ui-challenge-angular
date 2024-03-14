import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../../models/loginCred.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { BASE_URL } from '../../config';
import { UserDataModel } from '../../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _userObject = new BehaviorSubject<UserDataModel | null>(null);

  signIn(credentials: LoginCredentials): Observable<UserDataModel> {
    return this.http.post<any>(`${BASE_URL}api/login`, credentials).pipe(
      tap((userData) => {
        if (userData.token) {
          localStorage.setItem('token', userData.token);
          this._userObject.next(userData);
        }
        console.log(userData);
      })
    );
  }

  getUser(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.http.get<UserDataModel>(`${BASE_URL}api/user`).pipe(
        tap((userData) => {
          this._userObject.next(userData);
        })
      );
    } else {
      this._userObject.next(null);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this._userObject.next(null);
  }

  get userObject() {
    return this._userObject;
  }
}
