import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDataModel } from 'src/app/core/models/userData.model';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnDestroy {
  editProfileForm!: FormGroup;

  isFormSent: boolean = false;

  userObject: UserDataModel | null;

  updateUserSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private toast: ToastService
  ) {
    this.userObject = this.authService.userObject.value;

    this.editProfileForm = new FormGroup({
      username: new FormControl(
        { value: this.userObject?.username, disabled: false },
        [Validators.required]
      ),
      email: new FormControl(
        { value: this.userObject?.email, disabled: false },
        [Validators.required]
      ),
      image: new FormControl(
        { value: this.userObject?.image, disabled: false },
        []
      ),
      bio: new FormControl(
        { value: this.userObject?.bio, disabled: false },
        []
      ),
    });
  }

  submitProfile() {
    if (this.editProfileForm.invalid || this.isFormSent) return;
    this.isFormSent = true;

    if (this.editProfileForm.valid) {
      const updatedUser: any = {
        username: this.username?.value,
        email: this.email?.value,
        image: this.image?.value,
        bio: this.bio?.value,
      };

      this.updateUserSubscription = this.usersService
        .updateUser(updatedUser)
        .subscribe({
          next: (reply) => {
            this.router.navigate(['/profile/' + reply.username]);
            this.authService.userObject.next(reply);
            this.toast.show({
              text: 'Profile updated successfully.',
              classname: 'bg-success text-light fs-5',
            });
          },
          error: (err) => {
            console.log(err);
            this.toast.show({
              text: err.error,
              classname: 'bg-danger text-light fs-5',
            });
          },
          complete: () => {
            this.isFormSent = false;
          },
        });
    }
  }

  get username() {
    return this.editProfileForm.get('username');
  }

  get email() {
    return this.editProfileForm.get('email');
  }

  get bio() {
    return this.editProfileForm.get('bio');
  }

  get image() {
    return this.editProfileForm.get('image');
  }

  ngOnDestroy(): void {
    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }
  }
}
