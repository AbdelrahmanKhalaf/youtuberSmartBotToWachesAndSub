import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IDetailsBouqute } from '../shard/models/IDetailsBouqute';
import { UserService } from '../shard/services/user.service';

@Component({
  selector: 'app-bouquts',
  templateUrl: './bouquts.component.html',
  styleUrls: ['./bouquts.component.css'],
})
export class BouqutsComponent implements OnInit {
  constructor(private bouquteS: UserService) {}
  postBouqute = new FormGroup({
    idBouqute: new FormControl(''),
  });
  public message: any;
  public errorMessage: any;
  public bouqutes: any;
  get idBouqute() {
    return this.postBouqute.get('idBouqute');
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  PostReantaleBouqute() {
    const DataUser: IDetailsBouqute = {
      idBouqute: this.idBouqute.value,
    };
    this.bouquteS.addReantalBouqute(DataUser).subscribe(
      (res: any) => {
        this.message = res.message_ar;

        // this.router.navigate(['/activate'])
      },
      (err: any) => {
        // err = this.errorMessag
        console.log(err.error);

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
  ngOnInit(): void {
    this.bouquteS.getBouqute().subscribe((res: any) => {
      this.bouqutes = res;
    });
  }
}
