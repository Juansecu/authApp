import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
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
    private readonly _ROUTER: Router
  ) {}

  register(): void {
    this._ROUTER.navigate(['/users/dashboard']);
  }
}
