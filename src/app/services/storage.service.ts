import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  public uploadSong(song: File): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      firebase.storage().ref().child('songs').child(song.name).put(song)
        .then(d => resolve(d.ref.fullPath))
        .catch(e => reject(e))
    }));
  }

  public downloadSong(songTitle: string): Observable<Blob> {
    return from(new Promise<any>((resolve, reject) => {
      firebase.storage().ref().child(songTitle).getDownloadURL().then(
        url => {
          var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => resolve(xhr.response);
          xhr.open('GET', url);
          xhr.send();
        }
      )
      .catch(function(error) {
        console.error('error', error);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
      
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
        reject(error);
      });
    }));
  }
}
