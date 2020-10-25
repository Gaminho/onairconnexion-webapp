import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/environments/environment';
import { LoginModule } from './components/login/login.module';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarModule } from './components/navbar/navbar.module';
import { SongsComponent } from './components/songs/songs.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ProjectsComponent } from './components/projects/projects.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongsComponent,
    ArtistsComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    NavbarModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
