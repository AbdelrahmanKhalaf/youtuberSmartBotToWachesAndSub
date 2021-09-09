import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from '../shard/models/AppValidators';
import { IFeedback } from '../shard/models/IFeedback';
import { Auth } from '../shard/services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
  public errorMessage;
  public message;
  constructor(private auth: Auth, private router: Router) {}
  formfeedback = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(60),
    ]),
    des: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(315),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(40),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
    ]),
  });
  get email() {
    return this.formfeedback.get('email');
  }
  get name() {
    return this.formfeedback.get('name');
  }
  get des() {
    return this.formfeedback.get('des');
  }
  get subject() {
    return this.formfeedback.get('subject');
  }
  feedbackSend() {
    const feedbackData: IFeedback = {
      email: this.email.value,
      name: this.name.value,
      des: this.des.value,
      subject: this.subject.value,
    };
    this.auth.feedback(feedbackData).subscribe(
      (res: any) => {
        if (res) {
          this.message = res.message_ar;
        }
      },
      (err: any) => {
        console.log(err);

        // err = this.errorMessage
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 500) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error;
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
        if (err) {
          this.errorMessage = err.error.error;
        }
      }
    );
  }
  ngOnInit(): void {}
}
