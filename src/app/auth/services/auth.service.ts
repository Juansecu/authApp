import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthResponse } from '../typings/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _BASE_URL = `${environment.serverUrl}/users`;

  constructor(private readonly _HTTP: HttpClient) {}

  /*addUser(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ): Observable<AuthResponse> {}*/

  login(email: string, password: string): Observable<AuthResponse> {
    return this._HTTP.post<AuthResponse>(`${this._BASE_URL}/login`, {
      email,
      password,
    });
  }

  // renewToken(): Observable<AuthResponse> {}
}
