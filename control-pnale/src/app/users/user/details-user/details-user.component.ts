import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDATA } from 'src/app/shard/models/dataUpdate';
import { AuthService } from 'src/app/shard/services/auth.service';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css'],
})
export class DetailsUserComponent implements OnInit {
  constructor(
    private BS: BouquteService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  public Id: any;
  public user: any;
  public bouqute: any;
  public bouquteData: any;
  public numberOfEmails: any;
  public errorMessage: any;
  formUpdate = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.email,
    ]),
    address: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
    blocked: new FormControl(null, [Validators.required]),
  });
  get phone() {
    return this.formUpdate.get('phone');
  }
  get name() {
    return this.formUpdate.get('name');
  }
  get address() {
    return this.formUpdate.get('address');
  }
  get blocked() {
    return this.formUpdate.get('blocked');
  }
  update() {
    const data: IDATA = {
      phone: this.phone.value,
      name: this.name.value,
      address: this.address.value,
      blocked: this.blocked.value,
    };
    this.auth.updateInformtionUser(data, this.Id).subscribe(
      (res: any) => {
        this.router.navigate(['/users']);
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
      }
    );
  }
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.BS.DetailsUser(this.Id).subscribe((res: any) => {
      console.log(res);
      this.user = res.user[0];
      this.bouqute = res.bouquet[0];
      this.bouquteData = res.bouquteData[0];
      this.numberOfEmails = res.bouquet[0].emails.length;
    });
  }
}
