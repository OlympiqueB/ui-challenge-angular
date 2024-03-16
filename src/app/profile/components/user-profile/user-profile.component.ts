import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserDataModel } from 'src/app/core/models/userData.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  userObject!: UserDataModel | null;

  userDataForm!: FormGroup;

  userObjectSubscription!: Subscription;

  constructor(private authService: AuthService) {
    this.userObjectSubscription = this.authService.userObject.subscribe(
      (user) => {
        this.userObject = user;
      }
    );
  }

  ngOnInit(): void {
    this.userDataForm = new FormGroup({
      username: new FormControl(
        { value: this.userObject?.username, disabled: true },
        [Validators.minLength(3)]
      ),
      email: new FormControl(
        { value: this.userObject?.email, disabled: true },
        [Validators.email]
      ),
      bio: new FormControl({ value: this.userObject?.bio, disabled: true }, []),
      image: new FormControl({ value: this.userObject?.image, disabled: true }, []),
    });
  }

  ngOnDestroy(): void {
    if (this.userObjectSubscription) {
      this.userObjectSubscription.unsubscribe();
    }
  }
}
