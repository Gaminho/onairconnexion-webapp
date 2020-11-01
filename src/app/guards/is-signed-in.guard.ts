import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CacheService } from '../services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class IsSignedInGuard implements CanActivate {
  
  constructor(private _router: Router,
    private cacheService: CacheService,
    ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isSignedIn = this.cacheService.isSth();

    if (isSignedIn !== true) {
        this._router.navigate(['/login']);
    }

    this.cacheService.init();

    return isSignedIn;
  }

}
