import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private db: AngularFirestore) {
  }

  public getArtists(): Observable<any> {
    return this.db.collection('pages').get();
  }

  public addArtist(artist: any): Observable<any> {
    return from(this.db.collection('pages').add(artist));
  }
}
