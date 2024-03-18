import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';
import { authGuard } from '../core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: { mustNotBeLoggedIn: true },
    canActivate: [authGuard],
    component: RegFormComponent,
  },
  {
    path: 'thank-you',
    data: { mustNotBeLoggedIn: true },
    canActivate: [authGuard],
    component: ThankYouPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
