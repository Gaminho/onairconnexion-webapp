import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Song } from '../../interfaces/song';
import { AbstractFirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class SongService extends AbstractFirebaseService {
  
  getCollectionName(): string {
    return 'songs';
  }

  public getSongs(): Observable<Song[]> {
    return from(new Promise<Song[]>((resolve, reject) => {
      this.ref.get()
      .then(x => x.docs.map(x => x.data() as Song))
      .then(x => resolve(x))
      .catch(e => reject(e))
    }));
  }

  public addSong(song: Song): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      this.ref.add(song)
      .then(x => {
        resolve(x);
      })
      .catch(e => reject(e))
    }));
  }
}
