import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  constructor(private authService: AuthService) {}

  initializeApp() {
    return this.authService.getUser();
  }
}
