import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/core/models/loginCred.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  signInForm!: FormGroup;
  isFormSent: boolean = false;
  backendErrors: any;

  constructor(private authService: AuthService) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.signInForm.invalid || this.isFormSent) return;
    this.isFormSent = true;

    if (this.signInForm.valid) {
      const loginCred: LoginCredentials = {
        email: this.email,
        password: this.password,
      };

      this.authService.signIn(loginCred).subscribe({
        next: (reply) => {
          console.log(reply);
        },
        error: (err) => {
          this.backendErrors = err;
          console.log(this.backendErrors);
        },
        complete: () => {
          this.isFormSent = false;
        },
      });
    }
  }

  get email() {
    return this.signInForm.get('email')?.value;
  }

  get password() {
    return this.signInForm.get('password')?.value;
  }
}
