import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';

@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html',
  styleUrls: ['./reg-form.component.scss'],
})
export class RegFormComponent implements OnDestroy {
  regForm!: FormGroup;
  backendErrors?: any;
  isFormSent: boolean = false;

  usernameInputSubscription?: Subscription;
  emailInputSubscription?: Subscription;
  pwInputSubscription?: Subscription;

  constructor(private regService: RegistrationService, private router: Router) {
    this.regForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

    this.regForm.addControl(
      'confirmPassword',
      new FormControl('', [
        Validators.required,
        this.confirmPasswordValidator(this.regForm),
      ])
    );

    this.usernameInputSubscription = this.username?.valueChanges.subscribe(
      () => {
        if (this.backendErrors && this.backendErrors.username) {
          delete this.backendErrors.username;
        }
      }
    );

    this.emailInputSubscription = this.email?.valueChanges.subscribe(() => {
      if (this.backendErrors && this.backendErrors.email) {
        delete this.backendErrors.email;
      }
    });

    this.pwInputSubscription = this.password?.valueChanges.subscribe(() => {
      this.confirmPassword?.updateValueAndValidity();
      if (!this.password?.value) {
        this.confirmPassword?.setValue('');
      }
      if (this.backendErrors && this.backendErrors.password) {
        delete this.backendErrors.password;
      }
    });
  }

  confirmPasswordValidator(form: FormGroup): ValidatorFn {
    return (control: AbstractControl) => {
      return form.get('password')?.value === control.value &&
        control.value &&
        form.get('password')?.valid
        ? null
        : { passwordNotConfirmed: true };
    };
  }

  submitForm() {
    if (this.regForm.invalid || this.isFormSent) return;

    this.isFormSent = true;

    if (this.regForm.valid) {
      const newUser: UserModel = {
        username: this.username?.value,
        email: this.email?.value,
        password: this.password?.value,
      };

      this.regService.createUser(newUser).subscribe({
        next: (reply) => {
          this.router.navigate(['thank-you'])
        },
        error: (err) => {
          this.backendErrors = err.error.errors;
        },
        complete: () => {
          this.isFormSent = false;
        },
      });
    }
  }

  get username() {
    return this.regForm.get('username');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirmPassword() {
    return this.regForm.get('confirmPassword');
  }

  ngOnDestroy(): void {
    if (this.usernameInputSubscription) {
      this.usernameInputSubscription.unsubscribe();
    }
    if (this.emailInputSubscription) {
      this.emailInputSubscription.unsubscribe();
    }
    if (this.pwInputSubscription) {
      this.pwInputSubscription.unsubscribe();
    }
  }
}
