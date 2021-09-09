import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePlaylits } from 'src/app/shard/models/IChangePlaylist';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css'],
})
export class UpdatePlaylistComponent implements OnInit {
  constructor(
    private Authservice: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  get playlist() {
    return this.newPlayList.get('playlist');
  }
  get password() {
    return this.newPlayList.get('password');
  }
  public errorMessage;
  public message;
  public resetLink;
  public errorMessagPad = '';
  newPlayList = new FormGroup({
    playlist: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(8),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });

  ngOnInit(): void {}

  saveplaylist() {
    // tslint:disable-next-line:no-shadowed-variable
    const ChangePlaylits: ChangePlaylits = {
      playlist: this.playlist.value,

      password: this.password.value,
    };
    this.Authservice.changePlaylist(ChangePlaylits).subscribe(
      (res: any) => {
        if (res) {
          return (this.message = res.message_ar);
        }
      },
      (err: any) => {
        console.log(err);

        if (err.status === 502) {
          this.errorMessage = err.error;
        }
        if (err.status === 400) {
          this.errorMessagPad = err.error.error_ar;
        }
        if (err.status === 404) {
          this.errorMessage = err.error.error;
        }
        if (err.status === 401) {
          this.errorMessage = err.error.error_ar;
        }
      }
    );
  }
}
