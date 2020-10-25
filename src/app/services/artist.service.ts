import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from '../interfaces/artists';

const COLLECTION = 'artists';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private db: AngularFirestore) {
  }

  public getArtists(): Observable<Artist[]> {
    return this.db.collection(COLLECTION).get()
    .pipe(map(x => x.docs.map(x => x.data() as Artist)));
  }

  public addArtist(artist: any): Observable<any> {
    return from(this.db.collection('artists').add(artist));
  }
}
