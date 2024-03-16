import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginCredentials } from 'src/app/core/models/loginCred.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnDestroy {
  signInForm!: FormGroup;
  isFormSent: boolean = false;
  backendErrors: any;

  inputChangeSubscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.inputChangeSubscription = this.signInForm.valueChanges.subscribe(
      () => {
        if (this.backendErrors) {
          this.backendErrors = null;
        }
      }
    );
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
          this.router.navigate(['/'])
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

  ngOnDestroy(): void {
    if (this.inputChangeSubscription) {
      this.inputChangeSubscription.unsubscribe();
    }
  }
}
