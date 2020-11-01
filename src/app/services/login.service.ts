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
            .then((x: firebase.auth.UserCredential) => x.user)
            .then((u: firebase.User) => {
              this.userService.getUserWithUid(u.uid).subscribe({
                next: user => {
                  user.mail = u.email; 
                  this.cacheService.setCurrentAccount(user);
                  this.cacheService.setCurrentUID(u.uid);
                  resolve(u.uid);
                },
                error: e => {
                  console.error('error', e);
                  this.cacheService.setCurrentAccount(new User(u.uid, null, UserRole.MEMBER));
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
      .then((x: firebase.auth.UserCredential) => x.user)
      .then((u: firebase.User) => {
        const user = new User(u.uid, u.email, credentials.role);
        this.userService.createUser(user).subscribe({
          next: () => {
            this.cacheService.setCurrentAccount(user);
            this.cacheService.setCurrentUID(u.uid);
            resolve(u.uid);
          },
          error: e => {
            console.error('error', e);
            firebase.auth().currentUser.delete();
            reject(e);
          }
        });
      })
      .catch(e => reject(e))
    }));
  }

}

