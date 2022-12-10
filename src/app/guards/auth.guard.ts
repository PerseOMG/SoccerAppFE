import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { APP_SOCCER_JWT_KEY } from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    const JWT = localStorage.getItem(APP_SOCCER_JWT_KEY);

    if (JWT) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
