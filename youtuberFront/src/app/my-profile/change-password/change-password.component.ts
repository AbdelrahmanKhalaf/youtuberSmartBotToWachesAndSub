import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from 'src/app/shard/models/ChangePassword';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get newPass() {
    return this.newPassForma.get('newPass');
  }
  get password() {
    return this.newPassForma.get('password');
  }
  public errorMessage;
  public message;
  public resetLink;
  public errorMessagPad = '';
  newPassForma = new FormGroup({
    newPass: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}

  saveNewPass() {
    // tslint:disable-next-line:no-shadowed-variable
    const ChangePassword: ChangePassword = {
      newPass: this.newPass.value,

      password: this.password.value,
    };
    this.Authservice.changePassword(ChangePassword).subscribe(
      (res: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['auth/login']);
        if (res) {
          return (this.message = res.message_ar);
        }
      },
      (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessagPad = err.error.error_ar;
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
        if (err.status === 401) {
          this.errorMessage = err.error.error_ar;
        }
      }
    );
  }
}
