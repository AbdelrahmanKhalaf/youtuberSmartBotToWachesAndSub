import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from 'src/app/shard/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { WebSocketService } from 'src/app/shard/services/web-socket.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-misions',
  templateUrl: './my-misions.component.html',
  styleUrls: ['./my-misions.component.css'],
})
export class MyMisionsComponent implements OnInit {
  public DetailsMyBouqute: any;
  public IDSMission: any = [];
  public user: any;
  public link: any;
  public date: any;
  public dateNow: any;
  public dateClose: any;
  constructor(
    private US: UserService,
    private dom: DomSanitizer,
    private socket: WebSocketService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.US.getSubs().subscribe(
      (res: any) => {},
      (err: any) => {}
    );
    this.US.getDetailsMyBouquteActivadat().subscribe((res: any) => {
      if (res) {
        this.socket.emit('roomWorak', {
          id: res.myBouqute[0]._id,
          date: Date.now(),
          userId: res.myBouqute[0].userId,
        });
        // emit id user
        this.DetailsMyBouqute = res.myBouqute[0];
        console.log(this.DetailsMyBouqute);

        this.DetailsMyBouqute.mission.forEach((element) => {
          this.IDSMission.push(
            this.dom.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/?hd=0&listType=playlist&${element.playlistId}`
            )
          );
        });
      }
    });
    this.dateNow = Date.now();
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.dateClose = Date.now();
    this.date = this.dateClose - this.dateNow;
    this.socket.emit('countUser', {
      userId: this.route.snapshot.paramMap.get('id'),
      date: this.date,
    });
  }
}
