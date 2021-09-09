import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-all-accsept',
  templateUrl: './all-accsept.component.html',
  styleUrls: ['./all-accsept.component.css'],
})
export class AllAccseptComponent implements OnInit {
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
    this.bouquteS.getallAccsept().subscribe(
      (res: any) => {
        console.log(res);
        this.business = res;
        this.dtTrigger.next();
      },
      (err) => {}
    );
  }
  deleteBouqute(id) {
    this.bouquteS.deleteBouqute(id).subscribe(
      (res: any) => {
        this.message = res.message;
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
          alert(err.error + 'Please reload the page');
        }
      }
    );
  }
}
