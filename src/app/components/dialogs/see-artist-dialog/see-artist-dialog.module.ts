import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { SeeArtistDialogComponent } from './see-artist-dialog.component';



@NgModule({
  declarations: [SeeArtistDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  entryComponents: [SeeArtistDialogComponent]
})
export class SeeArtistDialogModule { }
