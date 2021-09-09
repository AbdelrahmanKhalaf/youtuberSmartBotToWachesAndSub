import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-details-bouqute-ra',
  templateUrl: './details-bouqute-ra.component.html',
  styleUrls: ['./details-bouqute-ra.component.css'],
})
export class DetailsBouquteRaComponent implements OnInit {
  constructor(
    private BS: BouquteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  public Id: any;
  public bouquet: any;
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.BS.getDetailsRea(this.Id).subscribe((res: any) => {
      console.log(res);
      this.bouquet = res.allUserAccsept[0];
    });
  }
}
