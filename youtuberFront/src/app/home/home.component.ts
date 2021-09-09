import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { IDetailsBouqute } from '../shard/models/IDetailsBouqute';
import { UserService } from '../shard/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private bouquteS: UserService,
    private title: Title,
    private meta: Meta
  ) {}
  postBouqute = new FormGroup({
    idBouqute: new FormControl(''),
  });
  public message: any;
  public errorMessage: any;
  public bouqutes: any;
  public numberOFHours: any;
  public errorMessagein: any;
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

        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessage = err.error.error_ar;
        }
        if (err.status === 500) {
          this.errorMessagein = 'الوصول مرفوض ، لم يتم توفير رمز مميز';
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
      this.meta.addTag({ name: 'description', content: `${res.des}` });
      this.meta.addTag({ name: 'keywords', content: `${res.keyword}` });
      this.bouqutes = res;
    });
  }
}
