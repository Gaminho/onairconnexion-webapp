import { Injectable } from '@angular/core';
import { UserRole } from '../interfaces/user';

const UID_KEY = 'uid';
const ROLE_KEY = 'role';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public saveInSession(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  private getFromSession(key: string): any {
    return sessionStorage.getItem(key);
  }

  public isSignedIn(): boolean {
    return this.getFromSession(UID_KEY) !== undefined 
      && this.getFromSession(UID_KEY) !== null;
  }

  get currentUid(): string {
    return this.getFromSession(UID_KEY);
  }

  get currentRole(): UserRole {
    return this.getFromSession(ROLE_KEY) || UserRole.MEMBER;
  }

  set currentRole(currentRole: UserRole) {
    this.saveInSession(ROLE_KEY, currentRole);
  }

  public signIn(uid: string): void {
    console.log('sign in', uid);
    this.saveInSession(UID_KEY, uid);
  }

  public signOut(): void {
    console.log('sign out');
    sessionStorage.clear();
  }
}
