import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Work } from 'src/app/interfaces/work';
import { AbstractFirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService extends AbstractFirebaseService {
  
  getCollectionName(): string {
    return 'works';
  }

  public getWorks(): Observable<Work[]> {
    return from(new Promise<Work[]>((resolve, reject) => {
      this.ref.get()
      .then(x => x.docs.map(x => this.workFromDoc(x)))
      .then(songs => resolve(songs))
      .catch(e => reject(e))
    }));
  }

  public updateWork(work: Work): Observable<void> {
    const id = work.id;
    work.id = null;
    return from(new Promise<void>((resolve, reject) => {
      this.ref.doc(id).set(work).then(
        () => resolve(),
        e => reject(e)
      );
    }));
  }

  public saveWotk(work: Work): Observable<any> {
    return from(new Promise<any>((resolve, reject) => {
      this.ref.add(work).then(x => resolve(x)).catch(e => reject(e))}));
  }

  private workFromDoc(x: firebase.firestore.QueryDocumentSnapshot): Work {
    const work = x.data() as Work;
    work.createdOn = new Date(x.data().createdOn.seconds * 1000);
    work.id = x.id;
    return work;
  }
  
}
