import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Artist } from '../../interfaces/artist';
import { AbstractFirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService extends AbstractFirebaseService {
  
  getCollectionName(): string {
    return 'artists';
  }

  public getArtists(): Observable<Artist[]> {
    return from(new Promise<Artist[]>((resolve, reject) => {
      this.ref.get()
      .then(x => x.docs.map(x => x.data() as Artist))
      .then(x => resolve(x))
      .catch(e => reject(e))
    }));
  }

  public addArtist(artist: Artist): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      this.ref.add({...artist})
      .then(x => resolve(x))
      .catch(e => reject(e))
    }));
  }
}
