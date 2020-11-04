import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { CacheService } from 'src/app/services/cache.service';
import { PlayerService } from 'src/app/services/player.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public artistCount: number = 0;
  public songCount: number = 0;
  private audio: any;

  constructor(private readonly cacheService: CacheService,
    private readonly playerService: PlayerService) { }

  ngOnInit() {
    this.cacheService.getArtistsAsObservable()
      .subscribe(artists => this.artistCount = artists.length)
  }

  play() {
    if (!this.audio) {
      this.playerService.getDefaultUrl().subscribe(
        d => {
          this.audio = new Audio(d);
          this.audio.play();
        },
        e => console.error('error', e)
      );
    } else {
      this.audio.play();
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
    }
  } 

}
