import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-update-bouqute-ra',
  templateUrl: './update-bouqute-ra.component.html',
  styleUrls: ['./update-bouqute-ra.component.css'],
})
export class UpdateBouquteRaComponent implements OnInit {
  constructor(
    private SB: BouquteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  postBusiness = new FormGroup({
    buy: new FormControl('', [Validators.required]),
  });
  get buy() {
    return this.postBusiness.get('buy');
  }
  public Id: any;
  public errorMessage: any;
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
  }
  addBusiness() {
    const DataBouqute: any = {
      buy: this.buy.value,
    };
    this.SB.updatDetailsRea(this.Id, DataBouqute).subscribe(
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
          this.errorMessage = err.error.Error;
        }
        if (err.status === 404) {
          this.errorMessage = err.error;
        }
      }
    );
  }
}
