import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from 'src/app/shard/models/AppValidators';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get email() {
    return this.EmailForgetPassword.get('email');
  }
  public errorMessage;
  public message;
  EmailForgetPassword = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.email,
    ]),
  });

  ngOnInit(): void {}

  saveEmail() {
    const Email: any = {
      email: this.email.value,
    };
    this.Authservice.forgetPassword(Email).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);

          return (this.message = res.message_ar);
        }
      },
      (err: any) => {
        console.log(err);

        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_ar;
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
