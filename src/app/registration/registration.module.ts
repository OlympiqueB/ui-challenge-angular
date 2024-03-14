import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegFormComponent } from './components/reg-form/reg-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ThankYouPageComponent } from './components/thank-you-page/thank-you-page.component';

@NgModule({
  declarations: [RegFormComponent, ThankYouPageComponent],
  imports: [CommonModule, ReactiveFormsModule, RegistrationRoutingModule],
})
export class RegistrationModule {}
