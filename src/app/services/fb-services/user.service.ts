import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { SessionService } from '../session.service';
import { AbstractFirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractFirebaseService {
  
  private currentUser: User;

  constructor(private readonly sessionService: SessionService) {
    super();
  }

  getCollectionName(): string {
    return 'users';
  }

  public createUser(user: User): Observable<any> {
    console.log('user', user);
    return from(new Promise<any>((resolve, reject) => {
      this.ref.add({...user})
      .then(x => resolve(x))
      .catch(e => reject(e))
    }));
  }

  public getUserWithUid(uid: string): Observable<User> {
    return from(new Promise<any>((resolve, reject) => {
      this.ref.where( 'uid', '==', uid).get()
      .then(x => x.docs.map(x => x.data() as User))
      .then(x => resolve(x[0]))
      .catch(e => reject(e))
    }));
  }

  public getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (this.currentUser) {
        return this.currentUser;
      } else {
        const uid = this.sessionService.currentUid;
        if (uid) {
          this.getUserWithUid(uid).subscribe({
            next: (u: User) => resolve(u),
            error: e => reject(e)
          });
        } else {
          reject('no user');
        }
      }
    });
  }
}
