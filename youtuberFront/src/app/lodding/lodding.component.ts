import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingScreenService } from '../shard/services/loading-screen/loading-screen.service';

@Component({
  selector: 'app-lodding',
  templateUrl: './lodding.component.html',
  styleUrls: ['./lodding.component.css'],
})
export class LoddingComponent implements OnInit {
  loading: any = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {}

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus
      .pipe(debounceTime(200))
      .subscribe((value) => {
        this.loading = value;
      });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
