import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  private artistCount: number = 0;
  private songCount: number = 0;

  constructor(private readonly cacheService: CacheService) { }

  ngOnInit() {
    this.cacheService.getArtistsAsObservable()
      .subscribe(artists => this.artistCount = artists.length)
  }

}
