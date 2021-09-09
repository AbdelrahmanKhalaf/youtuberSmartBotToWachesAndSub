import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBou } from '../models/IdataBouquet';
import { IplayListId } from '../models/IPlaylistId';

@Injectable({
  providedIn: 'root',
})
export class BouquteService {
  constructor(private http: HttpClient) {}
  addBouqute(dateBouqute: IBou) {
    return this.http.post(
      'http://localhost:3000/youtuber/api/bouquets/add',
      dateBouqute
    );
  }
  getBouqute() {
    return this.http.get('http://localhost:3000/youtuber/api/bouquets');
  }
  getallAccsept() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/allAccsept'
    );
  }
  getallTryIt() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/allTryIt'
    );
  }
  getallNotAccsept() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/allNotAccsept'
    );
  }
  getDetailsRea(id) {
    return this.http.get(
      `http://localhost:3000/youtuber/api/bouqute/DetilsBouqute/${id}`
    );
  }
  updatDetailsRea(id, IBuy: any) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/bouqute/update/${id}`,
      IBuy
    );
  }
  getallBouquteFree() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/free'
    );
  }
  getallBouqutePiad() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/bouqute/piad'
    );
  }
  getDetilsBouqute(id) {
    return this.http.get(
      `http://localhost:3000/youtuber/api/bouquets/${id}`
    );
  }
  deleteBouqute(id) {
    return this.http.delete(
      `http://localhost:3000/youtuber/api/bouquets/delete/${id}`
    );
  }
  updateBouqute(id, dateBouqute: IBou) {
    return this.http.put(
      `http://localhost:3000/youtuber/api/bouquets/${id}`,
      dateBouqute
    );
  }
  users() {
    return this.http.get(
      'http://localhost:3000/youtuber/api/users/users'
    );
  }
  DetailsUser(id) {
    return this.http.get(
      `http://localhost:3000/youtuber/api/users/admin/${id}`
    );
  }
  addChannalsTryfree(playlistId: IplayListId) {
    return this.http.post(
      `http://localhost:3000/youtuber/api/addMission/addChnnaleTry`,

      playlistId
    );
  }
  addChannalsPiadfree(playlistId: IplayListId) {
    return this.http.post(
      `http://localhost:3000/youtuber/api/addMission/addChnnaleFree`,

      playlistId
    );
  }
  getChat(id) {
    return this.http.get(
      `http://localhost:3000/youtuber/api/chats/${id}`
    );
  }
}
