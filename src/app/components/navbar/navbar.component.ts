import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  faSignOutAlt = faSignOutAlt;

  constructor(private readonly loginService: LoginService) { }

  public logOut(): void {
    this.loginService.logOut();
  }

}
