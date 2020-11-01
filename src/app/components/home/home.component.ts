import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/interfaces/user';
import { CacheService } from 'src/app/services/cache.service';
import { UserService } from 'src/app/services/fb-services/user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role: UserRole;

  constructor(private readonly router: Router,
    private readonly cacheService: CacheService) { }

  ngOnInit() {
    console.error('user', this.cacheService.isAdmin());
    console.error('role', this.cacheService._role);
  }

  public goTo(where: string) {
    this.router.navigate(['/', where]);
  }

}
