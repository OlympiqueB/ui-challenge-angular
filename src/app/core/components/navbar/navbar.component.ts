import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { UserDataModel } from '../../models/userData.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userObject!: UserDataModel | null;
  userObjSubscription!: Subscription;

  constructor(private auth: AuthService) {
    this.userObjSubscription = this.auth.userObject.subscribe(
      (user) => {
        this.userObject = user;
      }
    )
  }

  onSignOutClick() {
    this.auth.logout();
  }
}
