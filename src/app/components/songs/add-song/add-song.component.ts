import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SongService } from 'src/app/services/fb-services/song.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CacheService } from 'src/app/services/cache.service';
import { Router } from '@angular/router';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Artist } from 'src/app/interfaces/artist';
import { friendlyDuration } from 'src/app/utils/song-utils';
import { StorageService } from 'src/app/services/storage.service';

const MAX_FILE_SIZE = 10_000_000; // limit to 10Mo

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss', '../songs.component.scss']
})
export class AddSongComponent implements OnInit {

  @ViewChild('songInput', {static: false}) songInput: ElementRef;
  @ViewChild('prodInput', {static: false}) prodInput: ElementRef;

  public faBack = faChevronLeft;
  public songForm: FormGroup;
  public readonly faCheck = faCheck;
  private loading = false;

  private songFile: File;
  private prodFile: File;

  artistList: Artist[] = [];

  constructor(private readonly songService: SongService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cacheService: CacheService,
    private storageService: StorageService ) { }

  ngOnInit() {
    this.initForm();
    this.cacheService.getArtistsAsObservable().subscribe(d => this.artistList = d);
  }

  private initForm(): void {
    this.songForm = this.formBuilder.group({ 
      title: new FormControl('', [Validators.required, Validators.min(3)]),
      durationInSec: new FormControl('', [Validators.required]),
      artists: new FormControl('', [Validators.required]),
      projectId: new FormControl('', []),
      comment: new FormControl('', []),
      songPath: new FormControl('', []),
      prodPath: new FormControl('', [])
    });
  }

  public addSong() {
    this.startLoading();
    this.uploadPromise('song')
      .then(songPath => {
        this.songForm.controls['songPath'].setValue(songPath || null);
        this.uploadPromise('prod')
          .then(prodPath => {
            this.songForm.controls['prodPath'].setValue(prodPath || null);
            this.songService.addSong(this.songForm.value).subscribe({
              next: () => {
                this.stopLoading();
                this.songForm.reset();
                this.router.navigate(['songs/list']);
              },
              error: (e: any) => {
                console.error('error', e);
                this.stopLoading();
              }
            });
          })
          .catch(e => {
            console.error('error with prod file', e);
            this.stopLoading();
          })
      });
  }

  public isSelected(artistId: string): boolean {
    const current = this.songForm.controls['artists'].value as string[] || [];
    return current.indexOf(artistId) != -1;
  }

  public selectArtist(artistId: string) {
    let current = this.songForm.controls['artists'].value as string[] || [];
    const index = current.indexOf(artistId);
    if (index === -1) {
      current.push(artistId);
    } else {
      current.splice(index, 1);
    }
    this.songForm.controls['artists'].setValue(current);
  }

  public importSong(what: string = 'song') {
    if (what === 'song') {    
      this.songInput.nativeElement.click();
    } else if (what === 'prod') {
      this.prodInput.nativeElement.click();
    }
  }

  public onFileChanged(files: FileList, what:string = 'song'): void {
    console.log('file', files);
    let chosenFile = undefined;
    if (files.length > 0) {
      if (files[0].size <= MAX_FILE_SIZE) {
        chosenFile = files[0]
      } else {
        console.error('file is too big');
      }
    } 

    if (what === 'song') {
      this.songFile = chosenFile;
    } else if (what === 'prod') {
      this.prodFile = chosenFile;
    }
  }

  public back() {
    this.router.navigate(['songs/list']);
  }
  
  get friendlyDuration(): string {
    const duration = this.songForm.controls['durationInSec'].value || 0;
    return friendlyDuration(duration);
  }

  get songFileName(): string {
    return this.songFile ? this.songFile.name : '';
  }

  get prodFileName(): string {
    return this.prodFile ? this.prodFile.name : '';
  }

  private uploadPromise(waht: string = 'song'): Promise<string> {
    return new Promise((resolve, reject) => {
      const song = waht === 'song' ? this.songFile : this.prodFile;
      if (song) {
        this.storageService.uploadSong(song).subscribe({
          next: path => resolve(path),
          error: e => {
            console.error('can not upload song', e);
            reject();
          }
        })
      } else {
        resolve();
      }
    });
  }

  public startLoading():void {
    this.loading = true;
    this.songForm.disable();
  }

  public stopLoading():void {
    this.loading = false;
    this.songForm.enable();
  }
}
