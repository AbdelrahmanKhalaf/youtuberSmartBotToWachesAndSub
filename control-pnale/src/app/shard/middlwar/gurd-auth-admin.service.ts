import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class GurdAuthAdmin implements CanActivate {
  public actvition;
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route, state: RouterStateSnapshot) {
    this.auth.ditalsUser().subscribe((res: any) => {
      if (res.isAdmin === true) {
        return true;
      }
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url, massge: 'you are not admin' },
      });
    });
    return true;
  }
}
