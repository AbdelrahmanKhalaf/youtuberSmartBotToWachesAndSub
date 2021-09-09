import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';
import { UpdateInfo } from 'src/app/shard/models/UpdateInfo';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css'],
})
export class UpdateInfoComponent implements OnInit {
  constructor(
    private auth: Auth,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  get name() {
    return this.UpdateUser.get('name');
  }
  get phone() {
    return this.UpdateUser.get('phone');
  }

  get address() {
    return this.UpdateUser.get('address');
  }
  get password() {
    return this.UpdateUser.get('password');
  }
  public errorMessage = null;
  public DataUser: any;
  UpdateUser = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(315),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[011]\d{11}$/),
      Validators.minLength(11),
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(315),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
    this.auth.getUserInf().subscribe(
      (res: any) => {
        console.log(res);
        this.DataUser = res;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  PutUser() {
    const DataUser: UpdateInfo = {
      name: this.name.value,
      phone: this.phone.value,
      address: this.address.value,
      password: this.password.value,
    };
    this.auth.updateInf(DataUser).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigate(['/my-profile']);
      },
      (err: any) => {
        // err = this.errorMessage
        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 500) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_ar;
        }
      }
    );
  }
}
