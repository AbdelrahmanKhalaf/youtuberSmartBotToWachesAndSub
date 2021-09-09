import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-all-bouqute-piad',
  templateUrl: './all-bouqute-piad.component.html',
  styleUrls: ['./all-bouqute-piad.component.css'],
})
export class AllBouqutePiadComponent implements OnInit {
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
    this.bouquteS.getallBouqutePiad().subscribe(
      (res: any) => {
        this.business = res;
        this.dtTrigger.next();
      },
      (err) => {}
    );
  }
}
