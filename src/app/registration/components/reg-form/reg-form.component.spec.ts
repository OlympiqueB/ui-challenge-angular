import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  waitForAsync,
} from '@angular/core/testing';

import { RegFormComponent } from './reg-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration/registration.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegFormComponent', () => {
  let component: RegFormComponent;
  let fixture: ComponentFixture<RegFormComponent>;
  let registrationServiceSpy: jasmine.SpyObj<RegistrationService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('RegistrationService', ['createUser']);

    TestBed.configureTestingModule({
      declarations: [RegFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [{ provide: RegistrationService, useValue: spy }],
    }).compileComponents();

    registrationServiceSpy = TestBed.inject(
      RegistrationService
    ) as jasmine.SpyObj<RegistrationService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with form invalid', () => {
    expect(component.regForm.invalid).toBeTrue();
  });

  it('should become valid when all fields are correctly filled', () => {
    const username = component.regForm.controls['username'];
    const email = component.regForm.controls['email'];
    const password = component.regForm.controls['password'];
    const confirmPassword = component.regForm.controls['confirmPassword'];

    username.setValue('testuser');
    email.setValue('test@example.com');
    password.setValue('password123');
    confirmPassword.setValue('password123');

    expect(component.regForm.valid).toBeTrue();
  });

  it('should become invalid if any required field is left empty', () => {
    const username = component.regForm.controls['username'];
    const email = component.regForm.controls['email'];
    const password = component.regForm.controls['password'];
    const confirmPassword = component.regForm.controls['confirmPassword'];

    username.setValue('testuser');
    email.setValue('');
    password.setValue('password123');
    confirmPassword.setValue('password123');

    expect(component.regForm.valid).toBeFalse();
  });

  it('should become invalid if email format is incorrect', () => {
    const username = component.regForm.controls['username'];
    const email = component.regForm.controls['email'];
    const password = component.regForm.controls['password'];
    const confirmPassword = component.regForm.controls['confirmPassword'];

    username.setValue('testuser');
    email.setValue('invalidemail');
    password.setValue('password123');
    confirmPassword.setValue('password123');

    expect(component.regForm.valid).toBeFalse();
  });

  it('should become invalid if password and confirm password fields do not match', () => {
    const username = component.regForm.controls['username'];
    const email = component.regForm.controls['email'];
    const password = component.regForm.controls['password'];
    const confirmPassword = component.regForm.controls['confirmPassword'];

    username.setValue('testuser');
    email.setValue('test@example.com');
    password.setValue('password123');
    confirmPassword.setValue('password');

    expect(component.regForm.valid).toBeFalse();
  });

  it('should call submitForm method when submit button is clicked', () => {
    spyOn(component, 'submitForm');

    const username = component.regForm.controls['username'];
    const email = component.regForm.controls['email'];
    const password = component.regForm.controls['password'];
    const confirmPassword = component.regForm.controls['confirmPassword'];

    username.setValue('testuser');
    email.setValue('test@example.com');
    password.setValue('password123');
    confirmPassword.setValue('password123');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="click"]');
    button.click();
    expect(component.submitForm).toHaveBeenCalled();
  });

  it('should not do anything if the form is invalid during form submission', () => {
    spyOn(component, 'submitForm');
    component.regForm.controls['username'].setValue('testuser');
    component.regForm.controls['email'].setValue('');
    component.regForm.controls['password'].setValue('password123');
    component.regForm.controls['confirmPassword'].setValue('password123');

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[type="click"]');
    button.click();

    expect(component.submitForm).not.toHaveBeenCalled();
  });

  it('should call createUser method of RegistrationService with correct user data when form is valid during form submission', waitForAsync(() => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';

    component.regForm.controls['username'].setValue(username);
    component.regForm.controls['email'].setValue(email);
    component.regForm.controls['password'].setValue(password);
    component.regForm.controls['confirmPassword'].setValue(password);

    fixture.detectChanges();

    registrationServiceSpy.createUser.and.returnValue(of({}));

    const button = fixture.nativeElement.querySelector('button[type="click"]');
    button.click();

    expect(registrationServiceSpy.createUser).toHaveBeenCalledWith({
      username: username,
      email: email,
      password: password,
    });
  }));

  it('should unsubscribe from all subscriptions on component destruction', () => {
    spyOn(component.usernameInputSubscription!, 'unsubscribe');
    spyOn(component.emailInputSubscription!, 'unsubscribe');
    spyOn(component.pwInputSubscription!, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.usernameInputSubscription!.unsubscribe).toHaveBeenCalled();
    expect(component.emailInputSubscription!.unsubscribe).toHaveBeenCalled();
    expect(component.pwInputSubscription!.unsubscribe).toHaveBeenCalled();
  });

  it('should return correct form controls for getters', () => {
    expect(component.username).toEqual(component.regForm.controls['username']);
    expect(component.email).toEqual(component.regForm.controls['email']);
    expect(component.password).toEqual(component.regForm.controls['password']);
    expect(component.confirmPassword).toEqual(
      component.regForm.controls['confirmPassword']
    );
  });
});
