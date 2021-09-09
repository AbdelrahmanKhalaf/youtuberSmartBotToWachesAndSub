import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-all-not-accsept',
  templateUrl: './all-not-accsept.component.html',
  styleUrls: ['./all-not-accsept.component.css'],
})
export class AllNotAccseptComponent implements OnInit {
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
    this.bouquteS.getallNotAccsept().subscribe(
      (res: any) => {
        this.business = res;
        this.dtTrigger.next();
      },
      (err) => {}
    );
  }
}
