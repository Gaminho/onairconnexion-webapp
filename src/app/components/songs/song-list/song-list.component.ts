import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Song } from 'src/app/interfaces/song';
import { CacheService } from 'src/app/services/cache.service';
import { SongService } from 'src/app/services/fb-services/song.service';
import { friendlyDuration } from 'src/app/utils/song-utils';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss', '../songs.component.scss']
})
export class SongListComponent implements OnInit {

  public songs: Song[] = [];
  private currentCriteria = '';

  constructor(private readonly songService: SongService,
    private router: Router,
    private cacheService: CacheService) 
  { }

  ngOnInit() {
    this.refreshSongs();
  }

  public refreshSongs() {
    this.songService.getSongs().subscribe({
      next: (d: Song[]) => {
        d = d.sort((a, b) => b.title < a.title ? 1: -1);
        this.songs = this.findWithFilter(d, this.currentCriteria);
      },
      error: (e: any) => console.error('error', e)
    });
  }

  public addItem() {
    this.router.navigate(['songs/new']);
  }

  public filter(criteria: string) {
    this.currentCriteria = criteria;
    this.refreshSongs();
  }

  public findWithFilter(songs: Song[], criteria: string): Song[] {
    if (!criteria) {
      return songs;
    } else {
      return songs.filter(x => {
        criteria = criteria.toLowerCase().replace(/\s/g, '');
        const title = x.title.replace(/\s/g, '').toLowerCase();
        return title.indexOf(criteria) !== -1;
      });
    }
  }

  /* UI UTILS */

  public formatDuration(durationInSec: number): string {
    return friendlyDuration(durationInSec || 0);
  }

  public formatArtists(song: Song): string {
    let str = '';
    if (song.artists) {
      str = song.artists.map(id => this.cacheService.getArtists()
      .find(x => x.id === id).name)
      .sort((a, b) => b < a ? 1: -1)
      .join(', ');
    }
    return str;
  }

  get isAdmin(): boolean {
    return this.cacheService.isAdmin();
  }

}
