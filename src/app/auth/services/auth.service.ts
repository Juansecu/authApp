import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { AuthResponse } from '../typings/AuthResponse';
import { User } from 'src/app/users/typings/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: User;

  private readonly _BASE_URL = `${environment.serverUrl}/users`;

  get user(): User {
    return this._user;
  }

  constructor(private readonly _HTTP: HttpClient) {}

  /*addUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<AuthResponse> {}*/

  login(email: string, password: string): Observable<boolean | object> {
    return this._HTTP
      .post<AuthResponse>(`${this._BASE_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.ok) {
            sessionStorage.setItem('token', response.token!);

            this._user = {
              userId: response.userId!,
              email,
              firstName: response.firstName!,
              lastName: response.lastName!,
            };
          }
        }),
        map(({ ok }) => ok),
        catchError((error) => of(error.error))
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
  }

  register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<boolean | object> {
    return this._HTTP
      .post<AuthResponse>(`${this._BASE_URL}/register`, {
        email,
        firstName,
        lastName,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.ok) {
            sessionStorage.setItem('token', response.token!);

            this._user = {
              userId: response.userId!,
              email,
              firstName,
              lastName,
            };
          }

          return response;
        }),
        map(({ ok }) => ok),
        catchError((error) => of(error.error))
      );
  }

  renewToken(): Observable<boolean> {
    const headers = new HttpHeaders().set(
      'AUTH',
      sessionStorage.getItem('token') || ''
    );

    return this._HTTP
      .get<AuthResponse>(`${this._BASE_URL}/renew-token`, {
        headers,
      })
      .pipe(
        map((response) => {
          sessionStorage.setItem('token', response.token!);

          this._user = {
            userId: response.userId!,
            email: response.email!,
            firstName: response.firstName!,
            lastName: response.lastName!,
          };

          return response.ok;
        }),
        catchError((error) => of(false))
      );
  }
}
