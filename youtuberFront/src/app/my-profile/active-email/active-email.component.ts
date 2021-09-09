import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from 'src/app/shard/models/AppValidators';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-active-email',
  templateUrl: './active-email.component.html',
  styleUrls: ['./active-email.component.css'],
})
export class ActiveEmailComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get email() {
    return this.ActivateEmail.get('email');
  }
  public errorMessage;
  public message;
  public token;
  public messageWo;
  public errorMessagePad = '';
  ActivateEmail = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.email,
    ]),
  });

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.Authservice.activatedEmail(this.token).subscribe(
        (res: any) => {
          if (res) {
            this.message = res.message_ar;
          }
        },
        (err: any) => {
          if (err.status === 502) {
            this.errorMessage = err.error;
          }
          if (err.status === 400) {
            this.errorMessagePad = err.error.error_ar;
          }
          if (err.status === 404) {
            this.errorMessage = err.error;
          }
          if (err.status === 401) {
            this.errorMessage = err.error.error_ar;
          }
        }
      );
    } else {
      this.messageWo =
        'يرجى إدخال بريدك الإلكتروني إلينا ، نرسل لك رابط تفعيل بريدك الإلكتروني';
    }
  }
  ActivatedEmail() {
    const Email: any = {
      email: this.email.value,
    };
    this.Authservice.resendMessageActivation(Email).subscribe(
      (res: any) => {
        if (res) {
          console.log(res);

          return (this.message = res.message_ar);
        }
      },
      (err: any) => {
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_ar;
        }
        if (err.status === 404) {
          this.errorMessage = err.error.error_ar;
        }
        if (err.status === 401) {
          this.errorMessage = err.error.error_ar;
        }
      }
    );
  }
}
