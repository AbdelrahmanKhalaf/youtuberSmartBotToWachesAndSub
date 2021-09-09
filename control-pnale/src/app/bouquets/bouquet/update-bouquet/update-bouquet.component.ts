import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBou } from 'src/app/shard/models/IdataBouquet';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-update-bouquet',
  templateUrl: './update-bouquet.component.html',
  styleUrls: ['./update-bouquet.component.css'],
})
export class UpdateBouquetComponent implements OnInit {
  public errorMessage;
  public categories;
  public Id: any;
  public data: any;
  constructor(
    private BouquteS: BouquteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  postBusiness = new FormGroup({
    playlistRequired: new FormControl('', [Validators.required]),
    dailyWorkingHours: new FormControl('', [Validators.required]),
    numberOfGrids: new FormControl('', [Validators.required]),
    monthlyInternetConsumption: new FormControl('', [Validators.required]),
    daysOff: new FormControl('', [Validators.required]),
    dailySubscriberSum: new FormControl('', Validators.required),
    collectorOfDailyHours: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    numberOfDays: new FormControl('', [Validators.required]),
    keyword: new FormControl('', [Validators.required]),
    des: new FormControl('', [Validators.required]),
  });
  get numberOfDays() {
    return this.postBusiness.get('numberOfDays');
  }

  get playlistRequired() {
    return this.postBusiness.get('playlistRequired');
  }
  get dailyWorkingHours() {
    return this.postBusiness.get('dailyWorkingHours');
  }
  get numberOfGrids() {
    return this.postBusiness.get('numberOfGrids');
  }
  get monthlyInternetConsumption() {
    return this.postBusiness.get('monthlyInternetConsumption');
  }
  get daysOff() {
    return this.postBusiness.get('daysOff');
  }
  get dailySubscriberSum() {
    return this.postBusiness.get('dailySubscriberSum');
  }
  get collectorOfDailyHours() {
    return this.postBusiness.get('collectorOfDailyHours');
  }
  get price() {
    return this.postBusiness.get('price');
  }
  get title() {
    return this.postBusiness.get('title');
  }
  get key() {
    return this.postBusiness.get('title');
  }
  get keyword() {
    return this.postBusiness.get('keyword');
  }
  get des() {
    return this.postBusiness.get('des');
  }
  addBusiness() {
    const DataBouqute: IBou = {
      playlistRequired: this.playlistRequired.value,
      dailyWorkingHours: this.dailyWorkingHours.value,
      numberOfGrids: this.numberOfGrids.value,
      monthlyInternetConsumption: this.monthlyInternetConsumption.value,
      daysOff: this.daysOff.value,
      dailySubscriberSum: this.dailySubscriberSum.value,
      collectorOfDailyHours: this.collectorOfDailyHours.value,
      price: this.price.value,
      title: this.title.value,
      keyword: this.keyword.value,
      des: this.des.value,
      numberOfDays: this.numberOfDays.value,
    };
    this.BouquteS.updateBouqute(this.Id, DataBouqute).subscribe(
      (res: any) => {
        this.router.navigate(['']);
      },
      (err) => {
        console.log(err);
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
      }
    );
  }
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.BouquteS.getDetilsBouqute(this.Id).subscribe((res: any) => {
      this.data = res;
    });
  }
}
