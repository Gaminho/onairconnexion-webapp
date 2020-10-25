import { Injectable } from '@angular/core';

const AUTH_KEY = 'is-authenticated'; 

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public saveInSession(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  public getFromSession(key: string): any {
    return sessionStorage.getItem(key);
  }

  public isSignedIn(): boolean {
    return Boolean(this.getFromSession(AUTH_KEY)) || false;
  }

  public signIn(): void {
    this.saveInSession(AUTH_KEY, true);
  }

  public signOut(): void {
    sessionStorage.clear();
  }
}
