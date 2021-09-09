import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-side-par',
  templateUrl: './side-par.component.html',
  styleUrls: ['./side-par.component.css'],
})
export class SideParComponent implements OnInit {
  constructor(private auth: AuthService) {}
  public user: any;
  ngOnInit(): void {
    this.auth.ditalsUser().subscribe((res: any) => {
      this.user = res;
    });
  }
}
