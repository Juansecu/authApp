import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  errors: any[] = [];
  form: FormGroup = this._FORM_BUILDER.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/[a-z0-9]/i),
        Validators.minLength(8),
        Validators.maxLength(20),
      ],
    ],
  });

  constructor(
    private readonly _FORM_BUILDER: FormBuilder,
    private readonly _ROUTER: Router,
    private readonly _AUTH_SERVICE: AuthService
  ) {}

  login(): void {
    const { email, password } = this.form.value;

    this._AUTH_SERVICE.login(email, password).subscribe((response) => {
      if (typeof response === 'object') {
        if ((response as any).errors) {
          let errorTemplate = `
            You have the next errors:
            <ul>
          `;

          this.errors = [];

          if ((response as any).errors.email)
            this.errors.push((response as any).errors.email);

          if ((response as any).errors.password)
            this.errors.push((response as any).errors.password);

          for (const error of this.errors) {
            errorTemplate += `
              <li>- ${error.msg}</li>
            `;
          }

          errorTemplate += `
            </ul>
          `;

          Swal.fire({
            icon: 'error',
            html: errorTemplate,
          });
        } else Swal.fire('Error', (response as any).message, 'error');
      } else this._ROUTER.navigate(['/users/dashboard']);
    });
  }
}
