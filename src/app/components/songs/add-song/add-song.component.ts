import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song';
import { SongService } from 'src/app/services/fb-services/song.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { friendlyDuration } from 'src/app/utils/song-utils';
import { CacheService } from 'src/app/services/cache.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  public songForm: FormGroup;

  constructor(private readonly songService: SongService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cacheService: CacheService) { }

  ngOnInit() {
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
      id: null,
      title: _title.split('-')[0],
      durationInSec: _title.split('-')[1],
      artists: []
    };

    this.songService.addSong(song).subscribe({
      next: () => {
        this.songForm.reset();
        this.router.navigate(['songs'])
      },
      error: (e: any) => console.error('error', e)
    });    
  }

}
