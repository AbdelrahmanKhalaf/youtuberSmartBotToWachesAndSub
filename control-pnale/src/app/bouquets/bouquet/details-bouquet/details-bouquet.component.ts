import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shard/services/auth.service';
import { BouquteService } from 'src/app/shard/services/bouqute.service';
import { WebSocketService } from 'src/app/shard/services/web-socket.service';

@Component({
  selector: 'app-details-bouquet',
  templateUrl: './details-bouquet.component.html',
  styleUrls: ['./details-bouquet.component.css'],
})
export class DetailsBouquetComponent implements OnInit {
  public bouquet: any;
  public Id;
  public massage: any;
  public chats: any;
  public mags: any = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bouquteS: BouquteService,
    private socket: WebSocketService,
    private auth: AuthService
  ) {}
  postMassage() {
    this.socket.emit('join', { room: this.Id });
    this.auth.ditalsUser().subscribe((res: any) => {
      this.socket.emit('createMasg', {
        mas: this.massage,
        room: this.Id,
        sender: res.name,
      });
    });
  }
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.bouquteS.getDetilsBouqute(this.Id).subscribe((res: any) => {
      this.bouquet = res;
    });
    this.bouquteS.getChat(this.Id).subscribe((res: any) => {
      console.log(res);
      this.chats = res.cahts;
    });
    this.socket.listen('newMasagee').subscribe((mas: any) => {
      console.log(mas);
      this.mags.push(mas);
    });
  }
}
