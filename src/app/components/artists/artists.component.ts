import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artist';
import { ArtistService } from 'src/app/services/fb-services/artist.service';
import { MatDialog } from '@angular/material';
import { AddArtistDialogComponent } from '../dialogs/add-artist-dialog/add-artist-dialog.component';
import { SeeArtistDialogComponent } from '../dialogs/see-artist-dialog/see-artist-dialog.component';
import { faInstagram, faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  public readonly faFacebook = faFacebookSquare;
  public readonly faInstagram = faInstagram;
  public readonly faYoutube = faYoutube;

  public artists: Artist[] = [];

  constructor(private readonly artistService: ArtistService,
    private readonly cacheService: CacheService, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.cacheService.getArtistsAsObservable()
      .subscribe(artists => this.artists = artists);
  }

  public addArtist() {
    this.dialog.open(AddArtistDialogComponent).afterClosed().subscribe(
      (artist: Artist) => this.saveArtist(artist),
      (err) => console.error('error', err)
    );
  }

  public seeArtist(artist: Artist) {
    this.dialog.open(SeeArtistDialogComponent, {data: artist});
  }

  public refreshArtists() {
    this.artists = this.cacheService.getArtists();
  }

  public saveArtist(artist: Artist): void {
    this.artistService.addArtist(artist).subscribe({
      next: () => this.cacheService.updateArtists(),
      error: e => console.error('error', e)
    });
  }

}
