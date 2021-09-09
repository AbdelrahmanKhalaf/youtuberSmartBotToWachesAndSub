import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDATA } from '../models/dataUpdate';
import { IUserLogin } from '../models/IUserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  loguotuser() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  makeUserLogin(login: IUserLogin) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/auth/login/admin',
      login
    );
  }
  updateInformtionUser(dataUpdate: IDATA, id) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/admin/changeInf/${id}`,
      dataUpdate
    );
  }
  ditalsUser() {
    return this.http.get('http://localhost:3000/youtuber/api/users/me');
  }
}
