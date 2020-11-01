import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CacheService } from 'src/app/services/cache.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public faSignOutAlt = faSignOutAlt;
  public role = '';

  constructor(private readonly loginService: LoginService,
    private readonly cacheService: CacheService
    ) { }
  
  ngOnInit(): void {
    this.role = this.cacheService._role;
  }

  public logOut(): void {
    this.loginService.logOut();
  }

}
