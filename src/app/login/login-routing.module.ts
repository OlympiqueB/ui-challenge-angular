import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { authGuard } from '../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginFormComponent,
    data: { mustNotBeLoggedIn: true },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
