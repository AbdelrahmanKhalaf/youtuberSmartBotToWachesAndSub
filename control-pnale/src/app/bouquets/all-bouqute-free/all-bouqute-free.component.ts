import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-all-bouqute-free',
  templateUrl: './all-bouqute-free.component.html',
  styleUrls: ['./all-bouqute-free.component.css'],
})
export class AllBouquteFreeComponent implements OnInit {
  public business: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public complate;
  message: any;
  errorMessage: any;
  constructor(private bouquteS: BouquteService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.bouquteS.getallBouquteFree().subscribe(
      (res: any) => {
        console.log(res);

        this.business = res;
        this.dtTrigger.next();
      },
      (err) => {}
    );
  }
}
