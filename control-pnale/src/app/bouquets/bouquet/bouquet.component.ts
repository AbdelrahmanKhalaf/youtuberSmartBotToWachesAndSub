import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BouquteService } from '../../shard/services/bouqute.service';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.css'],
})
export class BouquetComponent implements OnInit {
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
    this.bouquteS.getBouqute().subscribe(
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
