import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetailsBouqute } from '../models/IDetailsBouqute';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getBouqute() {
    return this.http.get('http://localhost:3000/youtuber/api/bouquets');
  }
  addReantalBouqute(DitilsBouqute: IDetailsBouqute) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/bouqute/',
      DitilsBouqute
    );
  }
  getDetailsMyBouqute() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/mybouqute'
    );
  }
  getDetailsMyBouquteActivadat() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouquteActecidat/myDetilsBouqute'
    );
  }
  addEmails() {
    return this.http.get('http://localhost:3000/youtuber/api/chanle');
  }

  getSubs() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/chanle/dataChanle'
    );
  }

  AddSub() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/chanle/AddSub'
    );
  }
  getDetailsEmail(id: any) {
    return this.http.get(
      `http://localhost:3000/youtuber/api/chanle/sub/${id}`
    );
  }
  getChat() {
    return this.http.get(`http://localhost:3000/youtuber/api/chats/`);
  }
}
