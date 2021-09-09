import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OnInit, LOCALE_ID, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Auth } from './shard/services/auth.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  title = 'youtuberF';
  public massege;
  localId: string;
  currentLanguage: any;
  constructor(
    private route: ActivatedRoute,
    private auth: Auth,
    private router: Router,
    private titleService: Title
  ) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.auth.getUserInf().subscribe((res: any) => {
      if (res.verify === false) {
        this.massege = 'من فضللك فعل الاميل لتجنب الحذف ';
      }
    });
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationEnd:
          this.titleService.setTitle(
            this.route.firstChild.snapshot.data.title_ar
          );
          break;
        default:
          break;
      }
    });
  }
}
