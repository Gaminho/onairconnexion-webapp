import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AddArtistDialogModule } from '../dialogs/add-artist-dialog/add-artist-dialog.module';
import { SeeArtistDialogModule } from '../dialogs/see-artist-dialog/see-artist-dialog.module';
import { MatDialogModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [ArtistsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    AddArtistDialogModule,
    SeeArtistDialogModule,
    FontAwesomeModule
  ], 
  exports: [ArtistsComponent]
})
export class ArtistsModule { }
