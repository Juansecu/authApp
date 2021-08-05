import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
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

  constructor(private readonly _FORM_BUILDER: FormBuilder) {}

  login(): void {
    console.log(this.form.value);
  }
}
