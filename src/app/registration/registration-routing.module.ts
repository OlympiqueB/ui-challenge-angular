import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';

const routes: Routes = [
  {
    path: '',
    component: RegFormComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
