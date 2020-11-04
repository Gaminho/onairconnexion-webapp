import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { LoginCredentials } from '../interfaces/login-credentials';
import * as firebase from 'firebase';
import { UserService } from './fb-services/user.service';
import { User, UserRole } from '../interfaces/user';
import { CacheService } from './cache.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private authStatusSub = new BehaviorSubject(null);
  public currentAuthStatus = this.authStatusSub.asObservable();
  public obsAdmin = new BehaviorSubject(false);

  constructor(private readonly router: Router,
    private readonly cacheService: CacheService, 
    private readonly userService: UserService) {
    this.authStatusListener();
   }

  private authStatusListener(){
    firebase.auth().onAuthStateChanged(credential => {
      if (credential){
        this.cacheService.init();
        this.fetchUser(credential);
        this.authStatusSub.next(credential);
        console.log('User is logged in');
      }
      else {
        this.authStatusSub.next(null);
        console.log('User is logged out');
        this.router.navigate(['/login'])
      }
    });
  }

  public login(credentials: LoginCredentials): Observable<any> {
    return from(new Promise((resolve, reject) => { 
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(credentials.login, credentials.password)
        .then((x: firebase.auth.UserCredential) => resolve(x.user.uid))
        .catch(e => {
          console.error(e);
          reject(e);
        })
    }));
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

  private fetchUser(user: firebase.User): void {
    this.userService.getUserWithUid(user.uid).subscribe({
      next: u => {
        u.mail = user.email; 
        this.obsAdmin.next(u.role === UserRole.ADMIN);
        this.cacheService.setCurrentAccount(u);
      },
      error: e => {
        console.error('error', e);
        this.obsAdmin.next(false);
        this.cacheService.setCurrentAccount(new User(user.uid, null, UserRole.MEMBER));
      }
    })
  }

}

