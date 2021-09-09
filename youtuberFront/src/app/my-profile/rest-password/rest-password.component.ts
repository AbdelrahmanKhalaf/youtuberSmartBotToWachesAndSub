import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css'],
})
export class RestPasswordComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get newPass() {
    return this.newPassForma.get('newPass');
  }
  public errorMessage;
  public message;
  public resetLink;
  errorMessagePad = '';
  newPassForma = new FormGroup({
    newPass: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {
    this.resetLink = this.route.snapshot.paramMap.get('id');
  }

  saveNewPass() {
    const newPass: any = {
      newPass: this.newPass.value,
    };
    this.Authservice.restPassword(this.resetLink, newPass).subscribe(
      (res: any) => {
        if (res) {
          this.message = res.message_ar;
          this.router.navigate(['/auth/login']);
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
  }
}
