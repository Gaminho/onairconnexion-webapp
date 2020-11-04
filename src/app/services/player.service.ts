import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor() { }

  public getDefaultUrl(): Observable<string> {
    return this.getUrlWithSongTtle('Gamosh Sans trêve.mp3');
  }

  public getUrlWithSongTtle(title: string): Observable<string> {
    return from(new Promise<any>((resolve, reject) => {
      firebase.storage().ref().child('songs').child(title).getDownloadURL()
      .then(d => resolve(d))
      .catch(e => reject(e))
    }));
  }

  public getUrl(song: Song): Observable<string> {
    return from(new Promise<any>((resolve, reject) => {
      if (song.songPath) {
      firebase.storage().ref().child(song.songPath).getDownloadURL()
        .then(d => resolve(d))
        .catch(e => reject(e));
      } else {
        reject('song does not have songPath');
      }
    }));
  }
}
