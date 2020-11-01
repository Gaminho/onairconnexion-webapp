import { Injectable } from '@angular/core';
import { Artist } from '../interfaces/artist';
import { User, UserRole } from '../interfaces/user';
import { ArtistService } from './fb-services/artist.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private artists: Artist[];
  private currentUser: User;
  private currentUID: string;
  private role: string;

  constructor(private readonly artistService: ArtistService) { }

  public init(): void {
    this.artistService.getArtists().subscribe(d => {
      this.artists = d.sort((a, b) => b.name < a.name ? 1: -1);
    });
  }

  public getArtists(): Artist[] {
    return this.artists || [];
  }

  public setCurrentUID(uid: string) {
    this.currentUID = uid;
  }

  public getCurrentUID(): string {
    return this.currentUID || null;
  }

  public setCurrentAccount(user: User) {
    this.currentUser = user;
    this.setRole(user.role);
  }

  public deleteAccount() {
    this.currentUser = undefined;
    this.role = undefined;
  }

  public setRole(role: string) {
    this.role = role;
  }

  public isSth() : boolean {
    return this.role != null;
  }

  public isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  get _role(): string {
    return this.role;
  }

  getUser(): User {
    return this.currentUser;
  }
}
