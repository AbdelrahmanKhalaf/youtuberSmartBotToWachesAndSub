import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shard/services/user.service';

@Component({
  selector: 'app-detils-email',
  templateUrl: './detils-email.component.html',
  styleUrls: ['./detils-email.component.css'],
})
export class DetilsEmailComponent implements OnInit {
  public Email: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private SU: UserService
  ) {}
  public Id: any;
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.SU.getDetailsEmail(this.Id).subscribe((res: any) => {
      this.Email = res[0].emails[0];
    });
  }
}
