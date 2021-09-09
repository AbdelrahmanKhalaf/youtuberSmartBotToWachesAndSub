import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from 'src/app/shard/models/AppValidators';
import { ChangeEmail } from 'src/app/shard/models/IChangeEmail';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css'],
})
export class ChangeEmailComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get email() {
    return this.newEmail.get('email');
  }
  get password() {
    return this.newEmail.get('password');
  }
  public errorMessage;
  public message;
  public resetLink;
  public errorMessagPad = '';
  newEmail = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.maxLength(100),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}

  saveNewEmail() {
    // tslint:disable-next-line:no-shadowed-variable
    const ChangeEmail: ChangeEmail = {
      email: this.email.value,

      password: this.password.value,
    };
    this.Authservice.changeEmail(ChangeEmail).subscribe(
      (res: any) => {
        this.router.navigate(['my-profile']);
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
