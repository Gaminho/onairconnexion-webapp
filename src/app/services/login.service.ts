import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { LoginCredentials } from '../interfaces/login-credentials';
import * as firebase from 'firebase';
import { UserService } from './fb-services/user.service';
import { User, UserRole } from '../interfaces/user';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly router: Router,
    private readonly cacheService: CacheService, 
    private readonly userService: UserService) { }


  public login(credentials: LoginCredentials): Observable<any> {
    
    return from(new Promise((resolve, reject) => { 
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase.auth().signInAndRetrieveDataWithEmailAndPassword(credentials.login, credentials.password)
            .then((x: firebase.auth.UserCredential) => x.user.uid)
            .then((uid: string) => {
              this.userService.getUserWithUid(uid).subscribe({
                next: u => {
                  this.cacheService.setCurrentAccount(u);
                  resolve(uid);
                },
                error: e => {
                  console.error('error', e);
                  this.cacheService.setCurrentAccount(new User(uid, null, UserRole.MEMBER));
                }
            })
        })
        .catch(e => {
          console.error(e);
          reject(e);
        })
    })}));
  }

  public logOut(): void {
    firebase.auth().signOut().then(function() {
      this.router.navigate(['/login']);
      this.cacheService.deleteAccount();
    }.bind(this));
  }

  public signUp(credentials: any): Observable<any> {
    console.log('cred', credentials);
    return from(new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.login, credentials.password)
      .then((x: firebase.auth.UserCredential) => x.user.uid)
      .then(function(uid: string) {
        const user = new User(uid, null, credentials.role);
        this.userService.createUser(user).subscribe({
          next: () => {
            this.cacheService.setCurrentAccount(user);
            resolve(uid);
          },
          error: e => {
            console.error('error', e);
            firebase.auth().currentUser.delete();
            reject(e);
          }
        });
      }.bind(this))
      .catch(e => reject(e))
    }));
  }

  /*
  public signUp(credentials: any): Observable<any> {
    console.log('cred', credentials);
    return from(new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(credentials.login, credentials.password)
      .then((x: firebase.auth.UserCredential) => x.user.uid)
      .then(function(uid: string) {
        const user = new User(uid, null, credentials.role);
        this.userService.createUser(user).subscribe({
          next: (x: any) => resolve(x),
          error: (e: any) => {
            console.error('error', e)
            firebase.auth().currentUser.delete();
            reject(e);
          }
        });
      }.bind(this))
      .catch(e => reject(e))
    }));
  }
  */
}
