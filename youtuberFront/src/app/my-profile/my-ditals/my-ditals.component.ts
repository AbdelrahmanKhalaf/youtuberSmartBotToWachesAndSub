import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Auth } from 'src/app/shard/services/auth.service';
import { UserService } from 'src/app/shard/services/user.service';
import { WebSocketService } from 'src/app/shard/services/web-socket.service';

@Component({
  selector: 'app-my-ditals',
  templateUrl: './my-ditals.component.html',
  styleUrls: ['./my-ditals.component.css'],
})
export class MyDitalsComponent implements OnInit {
  constructor(
    private auth: Auth,
    private US: UserService,
    private Socket: WebSocketService
  ) {}
  public data: any;
  public erorrma: any;
  public errorWri: any;
  public age: any;
  public birthdate: Date | any;
  public avatar: string;
  public DateNow: any;
  public DetailsMyBouqute: any;
  public newAlert: boolean;
  public DetailsMyWeek: any;
  public remainingDays: any;
  public DetilsBouquteActicated: any;
  public remainingDays2: any;
  public DataEmails: any;
  public errorAddEmail: any;
  public RequestSub: number;
  public mission: any;
  public massage: any = [];
  public cahts: any;
  public DateEnd: Date | any;
  AddEmail() {
    this.US.addEmails().subscribe(
      (res: any) => {
        window.location.href = `${res.loginLink}`;
      },
      (err: any) => {}
    );
  }

  ngOnInit(): void {
    this.US.getSubs().subscribe(
      (resA: any) => {},
      (err: any) => {}
    );
    this.auth.getUserInf().subscribe(
      (res: any) => {
        this.birthdate = new Date(res.age);
        this.DateNow = new Date(Date.now());
        if (res.age) {
          const timeDiff = Math.abs(this.DateNow - this.birthdate);
          this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
          res.age = this.age;
        }
        this.data = res;

        this.Socket.emit('join', { room: res.idBouqute });
        this.Socket.listen('newMasagee').subscribe((mas: any) => {
          this.massage.push(mas);
        });
      },
      (err: any) => {
        this.erorrma = err.error;
        if (err.error) {
          this.errorWri =
            'You are not registered with us or you are not logged in with us';
        }
        return this.errorWri;
      }
    );

    // get Details my bouqute
    this.US.getDetailsMyBouqute().subscribe((res: any) => {
      // this.US.getDetailsMyBouquteActivadat().subscribe((resulltB: any) => {});
      if (res) {
        const dateNow: any = Date.now();

        this.DateEnd = new Date(res.myBouqute[0].endWeak);
        const timeDiff = Math.abs(dateNow - this.DateEnd);
        this.remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        this.DetailsMyWeek = res.myBouqute[0];

        if (res.myBouqute[0].buy && res.myBouqute[0].weakFinshed && this.data) {
          this.DateEnd = new Date(res.myBouqute[0].end);
          const timeDiff2 = Math.abs(dateNow - this.DateEnd);
          this.remainingDays2 = Math.floor(timeDiff2 / (1000 * 3600 * 24));
        }
      }
    });
    this.US.getDetailsMyBouquteActivadat().subscribe((res: any) => {
      if (res.myBouqute[0]) {
        this.DataEmails = res.myBouqute[0];
        this.mission = this.DataEmails.wached.length;
        for (let i = 0; this.DataEmails.emails.length > i; i++) {
          this.RequestSub = 0;
          this.RequestSub += this.DataEmails.emails[i].RequestSub.length;
        }
      }
    });
    // get chat of bouqute
    this.US.getChat().subscribe((res: any) => {
      this.cahts = res.cahts;
    });
  }
}
