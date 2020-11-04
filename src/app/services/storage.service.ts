import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public uploadSong(song: File): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      firebase.storage().ref().child('songs').child(song.name).put(song)
        .then(d => resolve(d.ref.fullPath))
        .catch(e => reject(e))
    }));
  }
}
