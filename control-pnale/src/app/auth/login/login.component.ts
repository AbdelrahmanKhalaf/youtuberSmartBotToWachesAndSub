import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserLogin } from '../../shard/models/IUserLogin';
import { AuthService } from '../../shard/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }
  public accessToken: any;
  public errorMessage: Error;
  formLogin = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });
  ngOnInit(): void {}
  saveLogin() {
    const UserLogin: IUserLogin = {
      email: this.email.value,
      password: this.password.value,
    };
    this.auth.makeUserLogin(UserLogin).subscribe(
      (res: any) => {
        this.accessToken = res.bearer;
        localStorage.setItem('token', res.bearer);
        if (res) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        }
      },
      (err: any) => {
        console.log(err.error);
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 500) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_en;
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
      }
    );
  }
}
