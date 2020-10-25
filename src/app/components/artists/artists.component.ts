import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interfaces/artists';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  public artists: Artist[] = [];

  constructor(private readonly artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getArtists().subscribe({
      next: data => this.artists = data.sort((a, b) => b.name < a.name ? 1: -1),
      error: (e) => console.error('error', e)
    });
  }

}
