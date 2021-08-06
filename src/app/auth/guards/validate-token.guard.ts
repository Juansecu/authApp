import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(
    private readonly _ROUTER: Router,
    private readonly _AUTH_SERVICE: AuthService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this._AUTH_SERVICE.renewToken().pipe(
      tap((valid) => {
        if (!valid) {
          this._ROUTER.navigate(['/auth/login']);
        }
      })
    );
  }

  canLoad(): Observable<boolean> | boolean {
    return this._AUTH_SERVICE.renewToken().pipe(
      tap((valid) => {
        if (!valid) {
          this._ROUTER.navigate(['/auth/login']);
        }
      })
    );
  }
}
