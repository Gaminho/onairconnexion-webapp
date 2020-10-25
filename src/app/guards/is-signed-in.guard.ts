import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  
  constructor(private _router: Router,
    private sessionService: SessionService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isSignedIn = this.sessionService.isSignedIn();
    console.log('is sign in', isSignedIn, isSignedIn !== true);
    if (isSignedIn !== true) {
        this._router.navigate(['/login']);
    }

    return isSignedIn;
  }

}
