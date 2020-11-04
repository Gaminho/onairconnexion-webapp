import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongsComponent } from './songs.component';
import { AddSongComponent } from './add-song/add-song.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatListModule, MatSelectModule } from '@angular/material';
import { SongListComponent } from './song-list/song-list.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    SongsComponent, 
    AddSongComponent,
    SongListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MatButtonModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports: [SongsComponent, AddSongComponent, SongListComponent]
})
export class SongsModule { }
