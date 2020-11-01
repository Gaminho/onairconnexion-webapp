import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song';
import { SongService } from 'src/app/services/fb-services/song.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { friendlyDuration } from 'src/app/utils/song-utils';
import { CacheService } from 'src/app/services/cache.service';


@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss',
    '../home/home.component.scss'
  ]
})
export class SongsComponent implements OnInit {

  public songs: Song[] = [];
  public songForm: FormGroup;

  constructor(private readonly songService: SongService,
    private formBuilder: FormBuilder,
    private cacheService: CacheService) 
  { }

  ngOnInit() {
    this.refreshSongs();
    this.initForm();
  }

  private initForm(): void {
    this.songForm = this.formBuilder.group({ 
      title: new FormControl('', [Validators.required, Validators.min(3)]),
      durationInSec: new FormControl(0, [Validators.required]),
    });
  }

  public addSong() {
    const _title = this.songForm.controls['title'].value;
    const song = {
      title: _title.split('-')[0],
      durationInSec: _title.split('-')[1]
    };

    this.songService.addSong(song).subscribe({
      next: () => this.refreshSongs(),
      error: e => console.error('error', e)
    });    
  }

  public refreshSongs() {
    this.songService.getSongs().subscribe({
      next: d => this.songs = d.sort((a, b) => b.title < a.title ? 1: -1),
      error: e => console.error('error', e)
    });
  }

  public formatDuration(durationInSec: number): string {
    return friendlyDuration(durationInSec || 0);
  }

  get isAdmin(): boolean {
    return this.cacheService.isAdmin();
  }

}
