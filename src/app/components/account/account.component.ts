import { Component, OnInit } from '@angular/core';
import { User, UserRole } from 'src/app/interfaces/user';
import { CacheService } from 'src/app/services/cache.service';
import { UserService } from 'src/app/services/fb-services/user.service';
import { translateRole } from 'src/app/utils/user-utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  private user = new User();

  constructor(
    private readonly cacheService: CacheService,
  ) { }

  ngOnInit() {
    this.user.role = this.cacheService._role as UserRole;
    this.fetchUser();
  }

  public fetchUser(): void {
    this.user = this.cacheService.getUser();
    /*
    this.userService.getUserWithUid(this.cacheService.getCurrentUID()).subscribe({
      next: u => this.user = u,
      error: e => console.error('error', e)
    });
    */
  }

  get role(): string {
    const role = this.user ? this.user.role as UserRole : null;
    return translateRole(role);
  }

}
