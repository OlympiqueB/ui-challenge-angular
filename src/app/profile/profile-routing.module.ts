import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { authGuard } from '../core/guards/auth/auth.guard';
import { profileGuard } from '../core/guards/profile/profile.guard';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: { requiresLogin: true },
    canActivate: [authGuard, profileGuard],
  },
  {
    path: ':username',
    component: UserProfileComponent,
    data: { requiresLogin: true },
    canActivate: [authGuard],
  },
  {
    path: ':username/edit',
    component: EditProfileComponent,
    data: { requiresLogin: true },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
