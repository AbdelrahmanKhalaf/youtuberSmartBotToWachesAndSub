import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IplayListId } from 'src/app/shard/models/IPlaylistId';
import { BouquteService } from 'src/app/shard/services/bouqute.service';

@Component({
  selector: 'app-add-channals',
  templateUrl: './add-channals.component.html',
  styleUrls: ['./add-channals.component.css'],
})
export class AddChannalsComponent implements OnInit {
  public errorMessage: any;
  postChannalTry = new FormGroup({
    playlistId: new FormControl('', [Validators.required]),
  });
  postChannalPia = new FormGroup({
    playlistId: new FormControl('', [Validators.required]),
  });
  get playlistId() {
    return this.postChannalTry.get('playlistId');
  }
  get playlistId2() {
    return this.postChannalPia.get('playlistId');
  }
  constructor(private BouquteS: BouquteService) {}
  addChannalTry() {
    const DataBouqute: IplayListId = {
      playlistId: this.playlistId.value,
    };
    this.BouquteS.addChannalsTryfree(DataBouqute).subscribe(
      (res: any) => {
        console.log(res);
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
        }
      }
    );
  }
  addChannalPai() {
    const DataBouqute: IplayListId = {
      playlistId: this.playlistId2.value,
    };
    this.BouquteS.addChannalsPiadfree(DataBouqute).subscribe(
      (res: any) => {
        console.log(res);
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
        }
      }
    );
  }
  ngOnInit(): void {}
}
