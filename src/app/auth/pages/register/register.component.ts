import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  errors: object[] = [];
  form: FormGroup = this._FORM_BUILDER.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(15)],
    ],
    lastName: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(15)],
    ],
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

  register(): void {
    if (this.form.valid) {
      const { email, firstName, lastName, password } = this.form.value;

      this._AUTH_SERVICE
        .register(email, firstName, lastName, password)
        .subscribe((response) => {
          if (typeof response === 'object') {
            if ((response as any).errors) {
              let errorTemplate = `
                You have the next errors:
                <ul>
              `;

              this.errors = [];

              if ((response as any).errors.email)
                this.errors.push((response as any).errors.email);

              if ((response as any).errors.firstName)
                this.errors.push((response as any).errors.firstName);

              if ((response as any).errors.lastName)
                this.errors.push((response as any).errors.lastName);

              if ((response as any).errors.password)
                this.errors.push((response as any).errors.password);

              errorTemplate += this.errors
                .map((error: any) => `<li>- ${error.msg}</li>`)
                .join('');

              errorTemplate += `
                </ul>
              `;

              Swal.fire({
                html: errorTemplate,
                icon: 'error',
                title: 'Error',
              });
            } else Swal.fire('Error', (response as any).message, 'error');
          } else this._ROUTER.navigate(['/users/dashboard']);
        });
    }
  }
}
