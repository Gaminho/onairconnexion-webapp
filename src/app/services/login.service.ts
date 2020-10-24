import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { LoginCredentials } from '../interfaces/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public login(credentials: LoginCredentials): Observable<any> {
    return from(new Promise<void>((resolve, reject) => {
      if (credentials.password === 'oac') {
        resolve();
      } else {
        reject();
      }
    }));
  }
}
