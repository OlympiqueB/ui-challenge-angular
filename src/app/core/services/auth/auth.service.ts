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

  signIn(credentials: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${BASE_URL}api/login`, credentials).pipe(
      tap((userData) => {
        const user: UserDataModel = userData.user;

        if (user.token) {
          localStorage.setItem('token', user.token);
          this._userObject.next(user);
        }
      })
    );
  }

  getUser() {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get<any>(`${BASE_URL}api/user`).pipe(
        tap((userData) => {
          const user: UserDataModel = userData.user;
          this._userObject.next(user);
        })
      );
    } else {
      return of(null);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this._userObject.next(null);
  }

  get userObject() {
    return this._userObject;
  }
}
