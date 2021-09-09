import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private BS: BouquteService) {}
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public complate;
  message: any;
  errorMessage: any;
  public users: any;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
    this.BS.users().subscribe((res: any) => {
      this.users = res;
      this.dtTrigger.next();
    });
  }
}
