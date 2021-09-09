import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shard/services/auth.service';

@Component({
  selector: 'app-nav-par',
  templateUrl: './nav-par.component.html',
  styleUrls: ['./nav-par.component.css'],
})
export class NavParComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}
  logout() {
    return this.auth.loguotuser();
  }
  login() {
    return this.auth.getToken();
  }
}
