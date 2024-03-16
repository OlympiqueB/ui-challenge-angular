import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UsersComponent } from './admin-page/user-management/users/users.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersComponent,
    AdminPageComponent
  ],
  imports: [CommonModule, AdminRoutingModule, NgbNavModule],
})
export class AdminModule {}
