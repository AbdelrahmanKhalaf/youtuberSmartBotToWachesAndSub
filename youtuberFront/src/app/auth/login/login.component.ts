import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from 'src/app/shard/models/AppValidators';
import { IUserLogin } from 'src/app/shard/models/IUserLogin.model';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public accessToken: any;
  public errorMessage: any;
  formLogin = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });
  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }
  saveLogin() {
    const UserLogin: IUserLogin = {
      email: this.email.value,
      password: this.password.value,
    };
    this.auth.makeUserLogin(UserLogin).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.bearer);
        this.accessToken = res.bearer;

        if (res) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/home']);
        }
      },
      (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 500) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_ar;
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
        if (err.status === 401) {
          this.errorMessage = err.error;
        }
      }
    );
  }
  ngOnInit(): void {}
}
