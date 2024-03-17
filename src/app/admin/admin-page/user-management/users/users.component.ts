import { UserDataModel } from 'src/app/core/models/userData.model';
import { UsersService } from '../../../../core/services/users/users.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/core/services/toast/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnDestroy {
  users!: UserDataModel[];

  usersSubscription!: Subscription;

  constructor(private usersService: UsersService, private toast: ToastService) {
    this.getUsers();
  }

  getUsers() {
    this.usersSubscription = this.usersService.getAllUsers().subscribe({
      next: (reply) => {
        this.users = reply;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  onDeleteClick(email: string) {
    if (confirm('Are you sure?')) {
      this.usersService.deleteUser(email).subscribe({
        next: (reply) => {
          this.toast.show({
            text: 'User deleted.',
            classname: 'bg-success text-light fs-5',
          });
        },
        error: (err) => {
          this.toast.show({
            text: err.error,
            classname: 'bg-danger text-light fs-5',
          });
        },
        complete: () => {
          this.getUsers();
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
