import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Auth } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGurde {
  constructor(private auth: Auth, private router: Router) {}
  canActivate(route, state: RouterStateSnapshot) {
    if (this.auth.getToken()) {
      return true;
    }
    this.router.navigate(['auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return true;
  }
}
