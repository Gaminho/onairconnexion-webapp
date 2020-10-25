import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly loginService: LoginService) { }

  ngOnInit() {
  }

  public signOut(): void {
    this.loginService.logOut();
  }

}
