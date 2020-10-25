import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddArtistDialogModule } from '../dialogs/add-artist-dialog/add-artist-dialog.module';
import { SeeArtistDialogModule } from '../dialogs/see-artist-dialog/see-artist-dialog.module';
import { MatDialogModule } from '@angular/material';



@NgModule({
  declarations: [ArtistsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    AddArtistDialogModule,
    SeeArtistDialogModule
  ], exports: [ArtistsComponent]
})
export class ArtistsModule { }
