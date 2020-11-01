import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Artist } from 'src/app/interfaces/artist';

@Component({
  selector: 'app-see-artist-dialog',
  templateUrl: './see-artist-dialog.component.html',
  styleUrls: ['./see-artist-dialog.component.scss']
})
export class SeeArtistDialogComponent {

  public artist: Artist;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Artist,
    public dialogRef: MatDialogRef<SeeArtistDialogComponent>) { 
      console.log('data', data);
      this.artist = data;
  }

  public close() {
    this.dialogRef.close();
  }

}
