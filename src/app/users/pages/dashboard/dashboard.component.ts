import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private readonly _ROUTER: Router) {}

  logout(): void {
    this._ROUTER.navigate(['/auth/login']);
  }
}
