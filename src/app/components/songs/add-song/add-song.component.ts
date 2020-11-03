import { Component, OnInit } from '@angular/core';
import { SongService } from 'src/app/services/fb-services/song.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/services/cache.service';
import { Router } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Artist } from 'src/app/interfaces/artist';
import { friendlyDuration } from 'src/app/utils/song-utils';


@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss', '../songs.component.scss']
})
export class AddSongComponent implements OnInit {

  public faBack = faChevronLeft;
  public songForm: FormGroup;

  public artists = new FormControl();
  artistList: Artist[] = [];
  //['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private readonly songService: SongService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cacheService: CacheService) { }

  ngOnInit() {
    this.initForm();
    this.cacheService.getArtistsAsObservable().subscribe(d => this.artistList = d);
    this.artists.valueChanges.subscribe(
      c => this.songForm.controls['artists'].setValue(c.map(x => x.id))
    )
  }

  private initForm(): void {
    this.songForm = this.formBuilder.group({ 
      title: new FormControl('', [Validators.required, Validators.min(3)]),
      durationInSec: new FormControl('', [Validators.required]),
      artists: new FormControl('', [Validators.required]),
      projectId: new FormControl('', []),
      comment: new FormControl('', [])
    });
  }

  public addSong() {
    this.songService.addSong(this.songForm.value).subscribe({
      next: () => {
        this.songForm.reset();
        this.router.navigate(['songs/list']);
      },
      error: (e: any) => console.error('error', e)
    });
  }

  public back() {
    this.router.navigate(['songs/list']);
  }
  
  get friendlyDuration(): string {
    const duration = this.songForm.controls['durationInSec'].value || 0;
    return friendlyDuration(duration);
  }
}
