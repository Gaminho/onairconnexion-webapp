import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artists';
import { ArtistService } from 'src/app/services/artist.service';
import { MatDialog } from '@angular/material';
import { AddArtistDialogComponent } from '../dialogs/add-artist-dialog/add-artist-dialog.component';
import { SeeArtistDialogComponent } from '../dialogs/see-artist-dialog/see-artist-dialog.component';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  public artists: Artist[] = [];

  constructor(private readonly artistService: ArtistService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.refreshArtists();
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
    this.artistService.getArtists().subscribe({
      next: data => this.artists = data.sort((a, b) => b.name < a.name ? 1: -1),
      error: e => console.error('error', e)
    });
  }

  public saveArtist(artist: Artist): void {
    this.artistService.addArtist(artist).subscribe({
      next: () => {
        this.artists.push(artist);
        this.artists.sort((a, b) => b.name < a.name ? 1: -1);
      },
      error: e => console.error('error', e)
    });
  }

}
