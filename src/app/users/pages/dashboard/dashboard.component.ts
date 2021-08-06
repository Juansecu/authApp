import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../typings/User';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 2rem;
      }
    `,
  ],
})
export class DashboardComponent {
  get user(): User {
    return this._AUTH_SERVICE.user;
  }

  constructor(
    private readonly _ROUTER: Router,
    private readonly _AUTH_SERVICE: AuthService
  ) {}

  logout(): void {
    this._ROUTER.navigate(['/auth/login']);
  }
}
