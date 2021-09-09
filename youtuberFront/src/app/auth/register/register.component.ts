import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppValidators } from 'src/app/shard/models/AppValidators';
import { Iuser } from 'src/app/shard/models/Iuser.model';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) {}
  public message: any;
  public errorMessage: any;
  public errorMessagePad: any;
  private loggedIn: boolean;
  postUser = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[569]\d{11}$/),
      Validators.minLength(11),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      AppValidators.acceptEnglisgh,
      Validators.maxLength(30),
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(100),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
      AppValidators.patternValidator(/\d/, { hasNumber: true }),
      AppValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      AppValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
    ]),
    age: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    playlist: new FormControl(null, [Validators.required]),
    yourChannel: new FormControl(null, [Validators.required]),
    avatar: new FormControl(null, [Validators.required]),
    google: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required]),
    codeFrinde: new FormControl(null, [Validators.required]),
  });
  get name() {
    return this.postUser.get('name');
  }
  get email() {
    return this.postUser.get('email');
  }
  get phone() {
    return this.postUser.get('phone');
  }
  get password() {
    return this.postUser.get('password');
  }
  get address() {
    return this.postUser.get('address');
  }
  get age() {
    return this.postUser.get('age');
  }
  get gender() {
    return this.postUser.get('gender');
  }
  get playlist() {
    return this.postUser.get('playlist');
  }
  get yourChannel() {
    return this.postUser.get('yourChannel');
  }
  get avatar() {
    return this.postUser.get('avatar');
  }
  get google() {
    return this.postUser.get('google');
  }
  get code() {
    return this.postUser.get('code');
  }
  get codeFrinde() {
    return this.postUser.get('codeFrinde');
  }
  PostUser() {
    const DataUser: Iuser = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      password: this.password.value,
      address: this.address.value,
      age: this.age.value,
      gender: this.gender.value,
      playlist: this.playlist.value,
      yourChannel: this.yourChannel.value,
      avatar: this.avatar.value,
      google: this.google.value,
      code: this.code.value,
      codeFrinde: this.codeFrinde.value,
    };
    this.auth.PostUser(DataUser).subscribe(
      (res: any) => {
        this.message = res.message_ar;
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 1000);

        // this.router.navigate(['/activate'])
      },
      (err: any) => {
        // err = this.errorMessag
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
  }
  // tslint:disable-next-line:no-shadowed-variable

  ngOnInit(): void {}
}
