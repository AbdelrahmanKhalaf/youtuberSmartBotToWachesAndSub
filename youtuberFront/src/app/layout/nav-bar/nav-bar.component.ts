import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private auth: Auth) {}
  login() {
    return this.auth.getToken();
  }
  logout() {
    return this.auth.loguotuser();
  }
  ngOnInit(): void {}
}
