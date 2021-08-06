import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  login(email: string, password: string): Observable<boolean> {
    return this._HTTP
      .post<AuthResponse>(`${this._BASE_URL}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.ok) {
            this._user = {
              userId: response.userId!,
              email,
              firstName: response.firstName!,
              lastName: response.lastName!,
            };
          }
        }),
        map(({ ok }) => ok),
        catchError((error) => of(false))
      );
  }

  // renewToken(): Observable<AuthResponse> {}
}
