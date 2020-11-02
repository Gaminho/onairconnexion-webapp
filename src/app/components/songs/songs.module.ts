import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material';



@NgModule({
  declarations: [
    SongsComponent, 
    AddSongComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports: [SongsComponent, AddSongComponent]
})
export class SongsModule { }
