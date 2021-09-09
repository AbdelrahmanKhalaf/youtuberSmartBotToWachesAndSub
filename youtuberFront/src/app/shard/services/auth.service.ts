import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePassword } from '../models/ChangePassword';
import { ChangeEmail } from '../models/IChangeEmail';
import { ChangePlaylits } from '../models/IChangePlaylist';
import { IFeedback } from '../models/IFeedback';
import { Iuser } from '../models/Iuser.model';
import { IUserLogin } from '../models/IUserLogin.model';
import { UpdateInfo } from '../models/UpdateInfo';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  PostUser(DataUser: Iuser) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/users/singup',
      DataUser
    );
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  loguotuser() {
    localStorage.removeItem('token');
    window.localStorage.removeItem('token');
    localStorage.clear();
    sessionStorage.removeItem('token');
  }
  makeUserLogin(login: IUserLogin) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/auth/login',
      login
    );
  }
  getUserInf() {
    return this.http.get('http://localhost:3000/youtuber/api/users/me');
  }
  postUserWithGooogle(login: IUserLogin) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/auth/login/google',
      login
    );
  }
  updateInf(updateData: UpdateInfo) {
    return this.http.put(
      'http://localhost:3000/youtuber/api/users/me/update',
      updateData
    );
  }
  UpdateUserAvatar(dataAvatar) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/me/avatar`,
      dataAvatar
    );
  }
  changePassword(dataPassword: ChangePassword) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/change-password`,
      dataPassword
    );
  }
  changeEmail(dataEmail: ChangeEmail) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/me/changEmail`,
      dataEmail
    );
  }
  changePlaylist(dataPlaylist: ChangePlaylits) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/me/changplayList`,
      dataPlaylist
    );
  }
  forgetPassword(email: any) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/forget-password/`,
      email
    );
  }
  restPassword(resetLink, password: any) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/reset-password/${resetLink}`,
      password
    );
  }
  resendMessageActivation(Email: any) {
    return this.http.post(
      `http://localhost:3000/youtuber/api/users/resendMessage`,
      Email
    );
  }
  activatedEmail(token) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/users/activate/${token}`,
      token
    );
  }
  feedback(feedback: IFeedback) {
    return this.http.post(
      `http://localhost:3000/youtuber/api/users/feedback`,
      feedback
    );
  }
}
