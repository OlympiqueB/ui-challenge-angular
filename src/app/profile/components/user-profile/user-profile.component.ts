import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { ProfileData } from 'src/app/core/models/profile.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ProfilesService } from 'src/app/core/services/profiles/profiles.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileData!: ProfileData;

  loggedInUser?: string;

  loggedInUserSubscription!: Subscription;
  activeRouteSubscription!: Subscription;

  constructor(
    private profilesService: ProfilesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.activeRouteSubscription = this.activeRoute.params
      .pipe(
        switchMap((params) => {
          const username = params['username'];
          if (username) {
            return this.profilesService.getProfileInfo(username);
          } else {
            return of(null);
          }
        })
      )
      .subscribe((data) => {
        if (data) {
          this.profileData = data.profile;
        } else {
          this.router.navigate(['/']);
        }
      });

      this.loggedInUserSubscription = this.authService.userObject.subscribe(
        (userObj) => {
          this.loggedInUser = userObj?.username;
        }
      )
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.activeRouteSubscription) {
      this.activeRouteSubscription.unsubscribe();
    }
  }
}
