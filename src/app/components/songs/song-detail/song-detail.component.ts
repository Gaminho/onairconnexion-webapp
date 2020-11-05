import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faDownload, faMusic, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Song } from 'src/app/interfaces/song';
import { CacheService } from 'src/app/services/cache.service';
import { SongService } from 'src/app/services/fb-services/song.service';
import { StorageService } from 'src/app/services/storage.service';
import { formatArtists, friendlyDuration } from 'src/app/utils/song-utils';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss', '../songs.component.scss']
})
export class SongDetailComponent implements OnInit {

  public faBack = faChevronLeft;
  public faDownload = faDownload;
  public currentSong = new Song();
  public faMusic = faMusic;
  public faPlay = faPlay;
  public faPause = faPause;

  private loadings: Map<string, boolean> = new Map()
    .set('song', false).set('prod', false);

  constructor(private router: Router,
    private readonly route: ActivatedRoute,
    private readonly songService: SongService,
    private readonly storageService: StorageService,
    private cacheService: CacheService 
    ) { }

  ngOnInit() {
    this.fetchSong(this.route.snapshot.paramMap.get('songId'));
  }

  public back() {
    this.router.navigate(['songs/list']);
  }

  private fetchSong(songId: string): void {
    this.songService.getSongWithId(songId).subscribe({
      next: d => {
        this.currentSong = d;
        console.log('song:', this.currentSong);
      },
      error: e => console.error('error while fetching song:', e)
    });
  }

  public download(what: string = 'song') {
    const path = what === 'song' ? this.currentSong.songPath : this.currentSong.prodPath;
    this.startLoading(what);
    this.storageService.downloadSong(path).subscribe({
        next: blob => {
          console.log('success', blob);
          saveAs(blob, path.substring(path.lastIndexOf('/')));
          this.stopLoading(what);
        },
        error: e => {
          console.error('error', e);
          this.stopLoading(what);
        }
    });
  }

  public isDownloading(what: string = 'song') {
    return this.loadings.has(what) && this.loadings.get(what);
  }

  public startLoading(what: string): void {
    this.loadings.set(what, true);
  }

  public stopLoading(what: string): void {
    this.loadings.set(what, false);
  }

  get artists(): string {
    return formatArtists(this.currentSong, this.cacheService) || 'Artiste inconnu';
  }

  get duration(): string {
    return friendlyDuration(this.currentSong.durationInSec || 0);
  }

}
