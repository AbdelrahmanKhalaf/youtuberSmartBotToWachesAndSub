import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GurdAuthService {
  constructor(private auth: AuthService, private router: Router) {}
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
