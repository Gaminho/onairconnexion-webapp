import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private readonly cacheService: CacheService) { }

  get isAdmin(): boolean {
    return this.cacheService.isAdmin();
  }

}
