import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { LoginCredentials } from '../interfaces/login-credentials';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private sessionService: SessionService, 
    private readonly router: Router) { }

  public login(credentials: LoginCredentials): Observable<any> {
    return from(new Promise<void>((resolve, reject) => {
      if (credentials.password === 'oac') {
        this.sessionService.signIn();
        resolve();
      } else {
        reject();
      }
    }));
  }

  public logOut(): void {
    this.sessionService.signOut();
    this.router.navigate(['/login']);
  }
}
