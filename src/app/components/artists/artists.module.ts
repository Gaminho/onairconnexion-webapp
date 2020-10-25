import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsComponent } from './artists.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ArtistsComponent],
  imports: [
    CommonModule,
    MatCardModule
  ], exports: [ArtistsComponent]
})
export class ArtistsModule { }
